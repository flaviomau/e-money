package com.vanhack.online.e_moneyapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{
    private String token;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btn_login = findViewById(R.id.btn_login);
        Button btn_balance = findViewById(R.id.btn_balance);
        Button btn_order = findViewById(R.id.btn_order);

        btn_login.setOnClickListener(this);
        btn_balance.setOnClickListener(this);
        btn_order.setOnClickListener(this);

        SharedPreferences prefs = getSharedPreferences("emoney", MODE_PRIVATE);
        this.token = prefs.getString("token", "");
    }

    @Override
    public void onClick(View view) {
        switch(view.getId()){
            case R.id.btn_login:
                showLogin();
                break;
            case R.id.btn_balance:
                showBalance();
                break;
            case R.id.btn_order:
                showOrder();
                break;
        }
    }

    private void showLogin(){
        Intent intent = new Intent(this, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
        finish();
    }

    private void showBalance(){
        if(this.token.length() == 0){
            Toast.makeText(this, "User not logged", Toast.LENGTH_LONG).show();
        }else{
            //Intent intent = new Intent(this, BalanceActivity.class);
            //intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            //startActivity(intent);
            //finish();
        }
    }

    private void showOrder(){
        if(this.token.length() == 0){
            Toast.makeText(this, "User not logged", Toast.LENGTH_LONG).show();
        }else{
            //Intent intent = new Intent(this, OrderActivity.class);
            //intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            //startActivity(intent);
            //finish();
        }
    }
}
