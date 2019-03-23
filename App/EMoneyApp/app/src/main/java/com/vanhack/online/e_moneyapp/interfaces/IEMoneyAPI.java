package com.vanhack.online.e_moneyapp.interfaces;

import com.vanhack.online.e_moneyapp.pojo.Customer;
import com.vanhack.online.e_moneyapp.pojo.Login;
import com.vanhack.online.e_moneyapp.pojo.Token;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface IEMoneyAPI {
    final String url = "http://192.168.237.129:3000/";
    @POST("users/login")
    Call<Token> login(@Body Login login);

    @GET("customers/user/{user_id}")
    Call<Customer> getCustomer(@Path("user_id") String user_id);

    public static final Retrofit retrofit  = new Retrofit
            .Builder()
            .baseUrl(url)
            .addConverterFactory(GsonConverterFactory.create())
            .build();

}
