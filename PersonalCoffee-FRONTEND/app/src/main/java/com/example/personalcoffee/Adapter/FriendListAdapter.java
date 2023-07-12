package com.example.personalcoffee.Adapter;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.RecyclerView;

import com.example.personalcoffee.Fragment.MyRecipeFragment;
import com.example.personalcoffee.Net;
import com.example.personalcoffee.R;

import java.util.ArrayList;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class FriendListAdapter extends RecyclerView.Adapter<FriendListAdapter.ViewHolder> {

    private ArrayList<String> mData = null ;
    //private Context context = null;

    // 아이템 뷰를 저장하는 뷰홀더 클래스.
    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView textView1;
        TextView deleteFriend;

        ViewHolder(View itemView) {
            super(itemView) ;
            // 뷰 객체에 대한 참조. (hold strong reference)
            textView1 = itemView.findViewById(R.id.textView15);
            deleteFriend = itemView.findViewById(R.id.delete_friend);
        }
    }

    // 생성자에서 데이터 리스트 객체를 전달받음.
    public FriendListAdapter(ArrayList<String> list){
        //this.context = context;
        mData = list ;
    }

    // onCreateViewHolder() - 아이템 뷰를 위한 뷰홀더 객체 생성하여 리턴.
    @Override
    public FriendListAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext() ;
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) ;

        View view = inflater.inflate(R.layout.item_friend_list, parent, false) ;
        FriendListAdapter.ViewHolder vh = new FriendListAdapter.ViewHolder(view) ;

        return vh ;
    }

    // onBindViewHolder() - position에 해당하는 데이터를 뷰홀더의 아이템뷰에 표시.
    @Override
    public void onBindViewHolder(FriendListAdapter.ViewHolder holder, int position) {
        String text = mData.get(position) ;
        holder.textView1.setText(text) ;

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //추천레시피와 친구레시피 화면공유해서 구분하는 코드 보내줘야함!
                Bundle bundle = new Bundle(); // 번들을 통해 값 전달
                bundle.putString("nickname", text);//번들에 넘길 값 저장
                Context context = holder.itemView.getContext();
                FragmentManager fragmentManager = ((AppCompatActivity) context).getSupportFragmentManager();
                FragmentTransaction transaction = fragmentManager.beginTransaction();
                MyRecipeFragment myRecipeFragment = new MyRecipeFragment();
                myRecipeFragment.setArguments(bundle);
                transaction.replace(R.id.container, myRecipeFragment);
                //transaction.addToBackStack(null);
                transaction.commit();
            }
        });
        
        holder.deleteFriend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                deleteFriend(text, position);
            }
        });
    }

    private void deleteFriend(String text, int position) {
        Call<ResponseBody> call = Net.getInstance().getApiService().deleteFriend(text);

        call.enqueue(new Callback<ResponseBody>()
        {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response)
            {
                if (response.isSuccessful() && response.body() != null)
                {
                    System.out.println("성공");
                    mData.remove(position);
                    notifyDataSetChanged();
                }else{
                    System.out.println("실패");
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t)
            {
                t.printStackTrace();
                System.out.println("에러");
            }
        });
    }

    @Override
    public int getItemCount() {
        return mData.size() ;
    }
}

