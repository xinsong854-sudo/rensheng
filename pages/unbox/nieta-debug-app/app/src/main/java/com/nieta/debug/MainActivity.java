package com.nieta.debug;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

    private WebView webView;
    private ProgressBar progressBar;
    private LinearLayout controlPanel;
    private TextView statusText;
    private String savedToken = "";

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

        // 标题栏
        statusText = new TextView(this);
        statusText.setText("🔍 捏 Ta 开盒工具");
        statusText.setTextSize(18);
        statusText.setPadding(20, 30, 20, 20);
        statusText.setTextColor(getResources().getColor(android.R.color.white));
        statusText.setBackgroundColor(getResources().getColor(android.R.color.black));
        mainLayout.addView(statusText);

        // 输入框区域
        LinearLayout inputPanel = new LinearLayout(this);
        inputPanel.setOrientation(LinearLayout.VERTICAL);
        inputPanel.setPadding(15, 15, 15, 15);
        inputPanel.setBackgroundColor(getResources().getColor(android.R.color.darker_gray));

        TextView hint = new TextView(this);
        hint.setText("粘贴角色/元素链接或 UUID：");
        hint.setTextSize(14);
        hint.setPadding(0, 0, 0, 10);
        inputPanel.addView(hint);

        EditText input = new EditText(this);
        input.setHint("https://... 或 UUID");
        input.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        input.setPadding(10, 10, 10, 10);
        inputPanel.addView(input);

        Button btnQuery = new Button(this);
        btnQuery.setText("🔍 查询");
        btnQuery.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        btnQuery.setPadding(0, 10, 0, 0);
        btnQuery.setOnClickListener(v -> {
            String value = input.getText().toString().trim();
            if (value.isEmpty()) {
                Toast.makeText(this, "请输入链接或 UUID", Toast.LENGTH_SHORT).show();
                return;
            }
            queryUnbox(value);
        });
        inputPanel.addView(btnQuery);

        Button btnToken = new Button(this);
        btnToken.setText("🔑 获取 Token（限流时用）");
        btnToken.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        btnToken.setPadding(0, 10, 0, 0);
        btnToken.setOnClickListener(v -> openTokenGetter());
        inputPanel.addView(btnToken);

        mainLayout.addView(inputPanel);

        // WebView
        webView = new WebView(this);
        webView.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.MATCH_PARENT,
            1.0f
        ));
        
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidApp");
        
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // 拦截捏 Ta 链接，在 WebView 内打开
                if (url.contains("app.nieta.art") || url.contains("talesofai.cn")) {
                    view.loadUrl(url);
                    return true;
                }
                // 其他链接用浏览器打开
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                startActivity(intent);
                return true;
            }
            
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (url.contains("app.nieta.art")) {
                    updateStatus("✅ 捏 Ta 已加载，正在获取 Token...");
                    getToken();
                }
            }
        });
        
        webView.setWebChromeClient(new WebChromeClient());
        mainLayout.addView(webView);

        // 进度条
        progressBar = new ProgressBar(this);
        progressBar.setLayoutParams(new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        ));
        mainLayout.addView(progressBar);

        setContentView(mainLayout);

        // 默认加载开盒工具页面
        updateStatus("🔍 加载开盒工具中...");
        webView.loadUrl("https://claw-annuonie-pages.talesofai.com/unbox/");
    }

    private void queryUnbox(String value) {
        updateStatus("🔍 查询中...");
        // 提取 UUID
        String uuid = extractUUID(value);
        if (uuid != null) {
            webView.loadUrl("https://claw-annuonie-pages.talesofai.com/unbox/?uuid=" + uuid);
        } else {
            Toast.makeText(this, "无效的链接或 UUID", Toast.LENGTH_SHORT).show();
        }
    }

    private String extractUUID(String input) {
        // UUID 格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        if (input.matches("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")) {
            return input;
        }
        // 从链接提取
        if (input.contains("uuid=")) {
            String[] parts = input.split("uuid=");
            if (parts.length > 1) {
                return parts[1].split("&")[0];
            }
        }
        return null;
    }

    private void openTokenGetter() {
        updateStatus("🔑 正在加载捏 Ta...");
        webView.loadUrl("https://app.nieta.art/mine");
    }

    private void getToken() {
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

    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }

        @JavascriptInterface
        public void onTokenReceived(String token) {
            runOnUiThread(() -> {
                if (token != null && !token.isEmpty()) {
                    savedToken = token;
                    ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                    ClipData clip = ClipData.newPlainText("Token", token);
                    clipboard.setPrimaryClip(clip);

                    new AlertDialog.Builder(MainActivity.this)
                        .setTitle("✅ Token 获取成功！")
                        .setMessage("Token 已复制，返回开盒工具粘贴使用\n\n" + token.substring(0, Math.min(50, token.length())) + "...")
                        .setPositiveButton("返回开盒工具", (dialog, which) -> {
                            webView.loadUrl("https://claw-annuonie-pages.talesofai.com/unbox/");
                            updateStatus("🔍 开盒工具");
                        })
                        .setNeutralButton("再复制一次", (dialog, which) -> {
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
