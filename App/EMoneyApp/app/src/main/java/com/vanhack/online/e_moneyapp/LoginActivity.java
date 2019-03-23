package com.vanhack.online.e_moneyapp;

import android.content.ContentUris;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.vanhack.online.e_moneyapp.interfaces.IEMoneyAPI;
import com.vanhack.online.e_moneyapp.pojo.Customer;
import com.vanhack.online.e_moneyapp.pojo.Login;
import com.vanhack.online.e_moneyapp.pojo.Token;
import com.vanhack.online.e_moneyapp.utils.JWTUtils;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener{
    private String token;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button btn_do_login = findViewById(R.id.btn_do_login);

        btn_do_login.setOnClickListener(this);

        SharedPreferences prefs = getSharedPreferences("emoney", MODE_PRIVATE);
        this.token = prefs.getString("value", "");
    }

    @Override
    public void onClick(View view) {
        switch(view.getId()){
            case R.id.btn_do_login:
                doLogin();
                break;
        }
    }

    private void doLogin(){
        EditText edtUserName = findViewById(R.id.edtUserName);
        EditText edtPassword = findViewById(R.id.edtPassword);

        Login login = new Login();
        login.username = edtUserName.getText().toString();
        login.password = edtPassword.getText().toString();

        if(login.username.length() == 0){
            Toast.makeText(getBaseContext(),
                    "Username required.",
                    Toast.LENGTH_SHORT).show();
        }else if(login.password.length() == 0){
            Toast.makeText(getBaseContext(),
                    "Password required.",
                    Toast.LENGTH_SHORT).show();
        }else{
            IEMoneyAPI api = IEMoneyAPI.retrofit.create(IEMoneyAPI.class);
            final Call<Token> call = api.login(login);
            call.enqueue(new Callback<Token>() {
                @Override
                public void onResponse(Call<Token> call, Response<Token> response) {
                    Token answer = response.body();
                    if(response.code() == 200 && answer != null){
                        try {
                            SharedPreferences prefs = getSharedPreferences("emoney", MODE_PRIVATE);
                            SharedPreferences.Editor editor = prefs.edit();
                            editor.putString("token", answer.token);
                            String sUser = JWTUtils.decoded(answer.token);
                            JSONObject user = new JSONObject(sUser);
                            editor.putString("id_user", user.getString("id_user"));
                            editor.commit();
                            backToMain();
                        }catch (Exception ex){
                            Toast.makeText(getBaseContext(),
                                    "Login process error (" + ex.getMessage() + ")",
                                    Toast.LENGTH_SHORT).show();
                        }
                    }else{
                        if(answer != null && answer.error.length() > 0)
                            Toast.makeText(getBaseContext(),
                                    "Login process error (" + answer.error + ")",
                                    Toast.LENGTH_SHORT).show();
                        else
                            Toast.makeText(getBaseContext(),
                                    "Login process error",
                                    Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<Token> call, Throwable t) {
                    Toast.makeText(getBaseContext(),
                            "Login process error ( " + t.getMessage() + ")",
                            Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private void backToMain(){
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
        finish();
    }

    private String getIdCustomer(String id_user){
        final String customerId = "";
        IEMoneyAPI api = IEMoneyAPI.retrofit.create(IEMoneyAPI.class);
        final Call<Customer> call = api.getCustomer(id_user);
        call.enqueue(new Callback<Customer>() {
            @Override
            public void onResponse(Call<Customer> call, Response<Customer> response) {
                Customer answer = response.body();
                if(response.code() == 200 && answer != null){
                    try {
                        Log.d("teste", answer.id_customer);
                    }catch (Exception ex){
                        Toast.makeText(getBaseContext(),
                                "Login process error (" + ex.getMessage() + ")",
                                Toast.LENGTH_SHORT).show();
                    }
                }else{
                    if(answer != null && answer.error.length() > 0)
                        Toast.makeText(getBaseContext(),
                                "Login process error (" + answer.error + ")",
                                Toast.LENGTH_SHORT).show();
                    else
                        Toast.makeText(getBaseContext(),
                                "Login process error",
                                Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Customer> call, Throwable t) {
                Log.d("error", t.getMessage());
            }
        });

        return customerId;
    }
}
