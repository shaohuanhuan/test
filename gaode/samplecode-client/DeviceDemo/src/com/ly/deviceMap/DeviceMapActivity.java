package com.ly.deviceMap;

import org.apache.cordova.DroidGap;

import android.R;
import android.os.Bundle;

public class DeviceMapActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        super.setIntegerProperty( "splashscreen", R.drawable.btn_default);
        //setContentView(R.layout.main);
        //html文件加载慢，设置超时时间
        super.setIntegerProperty("loadUrlTimeoutValue", 120000);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}