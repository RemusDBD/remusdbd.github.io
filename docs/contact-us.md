---
layout: common
title: Contact us
notitle: "true"
---
<style>
  /* General form styling */
  #fs-frm {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #000000;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  #fs-frm fieldset {
    border: none;
    padding: 0;
  }

  #fs-frm label {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  #fs-frm input[type="text"],
  #fs-frm input[type="email"],
  #fs-frm select,
  #fs-frm textarea {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }

  #fs-frm input:focus,
  #fs-frm select:focus,
  #fs-frm textarea:focus {
    outline: none;
    border-color: #48ff00; /* Highlight on focus */
    box-shadow: 0 0 5px rgba(72, 255, 0, 0.5);
  }

  #fs-frm input[type="submit"],
  #fs-frm input.button {
    background-color: #48ff00;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: block;
    width: 100%;
    text-align: center;
  }

  #fs-frm input[type="submit"]:hover,
  #fs-frm input.button:hover {
    background-color: #3ac600;
  }

  #fs-frm input[type="text"]::placeholder,
  #fs-frm input[type="email"]::placeholder,
  #fs-frm textarea::placeholder {
    color: #999;
  }

  /* Additional hidden input styling */
  #fs-frm input[name="_gotcha"] {
    display: none;
  }

  /* Responsive form adjustments */
  @media (max-width: 600px) {
    #fs-frm {
      padding: 1.5rem;
    }
  }
</style>

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
    <input class="button" value="Submit 提交" type="Submit">
  </fieldset>
</form>
