---
layout: common
title: 服務
notitle: "true"
description: Remus 雷姆提供顧問服務

---

<h1 class="mainTitle services">服務</h1>

<div class="service-cards">
    <a id= "consulting-link" class="card">
        <img src="/assets/img/docs/services/consulting-icon.png" alt="consulting">
        <h3 class="title">顧問服務</h3>
        <p>提供並打造最合適你的解決方案</p>
    </a>
</div>

<script>
    document.getElementById('consulting-link').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior
        loadContent('/docs/services/consulting', 'consultingContent'); // Load the consulting page
    });
</script>
