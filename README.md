contains files for the website located at [remusdbd.github.io](https://remusdbd.github.io/)<br>

Welcome for any contribution. Waiting for your pull request.<br>

-----------

<歡迎中文貢獻><br>
- 對於[聖所](https://remusdbd.github.io/docs/tools/tools.html/) <br>
  - 暫時此頁面為 static page<br>
  - 原設的 wikia.php 跟 load.php 被我轉成為 .css<br>
  - html 裡的 loading="lazy" 的元素也被我移走<br>
  - 暫時聖所內容應該都需要人手更新<br>
  - 不能從英文版的 dbd wiki 直接 fetch<br>
  - 已知更新：2024/10/30
      - [原版wiki](https://deadbydaylight.fandom.com/wiki/Shrine_of_Secrets)的 img src 已被encoded。請在以後更新，自行更換上 direct url。例子↓<hr>
        - 原版：  `<a href="/wiki/Shrine_of_Secrets" title="Shrine of Secrets"><img alt="IconHelp shrineOfSecrets" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" decoding="async" loading="lazy" width="32" height="32" data-image-name="IconHelp shrineOfSecrets.png" data-image-key="IconHelp_shrineOfSecrets.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/1/14/IconHelp_shrineOfSecrets.png/revision/latest/scale-to-width-down/32?cb=20171021115817" class="lazyload" /></a> <strong class="mw-selflink selflink">Shrine of Secrets</strong>`<hr>
        - 更換成： `<a href="/wiki/Shrine_of_Secrets" title="Shrine of Secrets"><img alt="IconHelp shrineOfSecrets" src="https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/1/14/IconHelp_shrineOfSecrets.png/" decoding="async"  width="32" height="32" data-image-name="IconHelp shrineOfSecrets.png" data-image-key="IconHelp_shrineOfSecrets.png" data-relevant="0" data-src="https://static.wikia.nocookie.net/deadbydaylight_gamepedia_en/images/1/14/IconHelp_shrineOfSecrets.png/" class="lazyload" /></a> <strong class="mw-selflink selflink">Shrine of Secrets</strong>`<hr>
