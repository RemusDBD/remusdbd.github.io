---
layout: common
title: Contact Us
notitle: "true"
---

<form id="fs-frm" name="contact-form" accept-charset="utf-8" action="https://formspree.io/f/manwrglz" method="post">
  <fieldset id="fs-frm-inputs">
    <label for="full-name">稱呼 Nickname</label>
    <input type="text" name="name" id="full-name" placeholder="稱呼 Nickname" required="">
    <label for="email-address">電子郵件 Email Address</label>
    <input type="email" name="_replyto" id="email-address" placeholder="email@domain.tld" required="">
    <label for="subject">主題 Subject</label>
    <select name="subject" id="subject" required="">
      <option value="" selected="" disabled="">選擇內容 Select Subject</option>
      <option value="Service enquiry">服務查詢 Service Enquiry</option>
      <option value="Other enquiry">其他查詢 Other Enquiry</option>
    </select>
    <input type="block" name="_subject" id="email-subject" placeholder="輸入標題 Input title here." required="">
    <label for="message">信息 Message</label>
    <textarea rows="5" name="message" id="message" placeholder="輸入你的信息 Input your message here." required=""></textarea>
    <input type="hidden" name="_next" value="/docs/contact-us-thanks">
    <input type="text" name="_gotcha" style="display:none">
    <div class="g-recaptcha" data-sitekey="6LdcxVgqAAAAAEGS19jcT7HqJMFQOPIXV7fTLst0"></div>
    <br/>
    <input class="button" value="Submit 提交" type="Submit">
  </fieldset>
</form>
