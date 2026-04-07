package com.nieta.debug;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

    private WebView webView;
    private ProgressBar progressBar;
    private LinearLayout controlPanel;
    private Button btnGetToken;
    private Button btnOpenNieta;
    private TextView statusText;
    private boolean isNietaLoaded = false;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 创建主布局
        LinearLayout mainLayout = new LinearLayout(this);
        mainLayout.setOrientation(LinearLayout.VERTICAL);
        mainLayout.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.MATCH_PARENT
        ));

        // 状态栏
        statusText = new TextView(this);
        statusText.setText("🔧 捏 Ta 调试助手");
        statusText.setTextSize(18);
        statusText.setPadding(20, 30, 20, 20);
        statusText.setTextColor(getResources().getColor(android.R.color.white));
        statusText.setBackgroundColor(getResources().getColor(android.R.color.black));
        mainLayout.addView(statusText);

        // WebView
        webView = new WebView(this);
        webView.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.MATCH_PARENT,
            1.0f
        ));
        
        // 配置 WebView
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        
        // 添加 JS 接口
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidApp");
        
        // 设置 WebViewClient
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (url.contains("app.nieta.art")) {
                    isNietaLoaded = true;
                    updateStatus("✅ 捏 Ta 已加载，点击获取 Token");
                    controlPanel.setVisibility(View.VISIBLE);
                }
            }
        });
        
        // 设置 WebChromeClient（支持控制台）
        webView.setWebChromeClient(new WebChromeClient());
        
        mainLayout.addView(webView);

        // 进度条
        progressBar = new ProgressBar(this);
        progressBar.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        mainLayout.addView(progressBar);

        // 控制面板
        controlPanel = new LinearLayout(this);
        controlPanel.setOrientation(LinearLayout.HORIZONTAL);
        controlPanel.setPadding(10, 10, 10, 10);
        controlPanel.setBackgroundColor(getResources().getColor(android.R.color.darker_gray));
        controlPanel.setVisibility(View.GONE);

        btnGetToken = new Button(this);
        btnGetToken.setText("🔑 获取 Token");
        btnGetToken.setLayoutParams(new LinearLayout.LayoutParams(
            0,
            LinearLayout.LayoutParams.WRAP_CONTENT,
            1.0f
        ));
        btnGetToken.setOnClickListener(v -> getToken());
        controlPanel.addView(btnGetToken);

        btnOpenNieta = new Button(this);
        btnOpenNieta.setText("🔓 打开捏 Ta");
        btnOpenNieta.setLayoutParams(new LinearLayout.LayoutParams(
            0,
            LinearLayout.LayoutParams.WRAP_CONTENT,
            1.0f
        ));
        btnOpenNieta.setOnClickListener(v -> openNieta());
        controlPanel.addView(btnOpenNieta);

        mainLayout.addView(controlPanel);

        setContentView(mainLayout);

        // 加载捏 Ta
        updateStatus("正在加载捏 Ta...");
        webView.loadUrl("https://app.nieta.art/mine");
    }

    private void openNieta() {
        updateStatus("正在加载捏 Ta...");
        webView.loadUrl("https://app.nieta.art/mine");
    }

    private void getToken() {
        if (!isNietaLoaded) {
            Toast.makeText(this, "请先加载捏 Ta 页面", Toast.LENGTH_SHORT).show();
            return;
        }

        // 注入 JS 获取 Token
        String jsCode = 
            "(function() {" +
            "  var token = localStorage.getItem('token') || " +
            "              sessionStorage.getItem('token') || " +
            "              document.cookie.match(/token=([^;]+)/)?.[1];" +
            "  if (token) {" +
            "    AndroidApp.onTokenReceived(token);" +
            "  } else {" +
            "    AndroidApp.onTokenReceived('');" +
            "  }" +
            "})();";

        webView.evaluateJavascript(jsCode, null);
    }

    private void updateStatus(String status) {
        runOnUiThread(() -> {
            statusText.setText(status);
            progressBar.setVisibility(View.GONE);
        });
    }

    // JS 接口类
    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void onTokenReceived(String token) {
            runOnUiThread(() -> {
                if (token != null && !token.isEmpty()) {
                    // 复制到剪贴板
                    ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                    ClipData clip = ClipData.newPlainText("Token", token);
                    clipboard.setPrimaryClip(clip);

                    // 显示对话框
                    new AlertDialog.Builder(MainActivity.this)
                        .setTitle("✅ Token 获取成功！")
                        .setMessage("Token 已复制到剪贴板：\n\n" + token.substring(0, Math.min(50, token.length())) + "...")
                        .setPositiveButton("确定", null)
                        .setNeutralButton("复制", (dialog, which) -> {
                            ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                            ClipData clip = ClipData.newPlainText("Token", token);
                            clipboard.setPrimaryClip(clip);
                            Toast.makeText(MainActivity.this, "已复制", Toast.LENGTH_SHORT).show();
                        })
                        .show();

                    updateStatus("✅ Token 已复制");
                } else {
                    new AlertDialog.Builder(MainActivity.this)
                        .setTitle("❌ 获取失败")
                        .setMessage("未找到 Token，请确认已登录捏 Ta")
                        .setPositiveButton("确定", null)
                        .show();

                    updateStatus("❌ 未找到 Token");
                }
            });
        }
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
