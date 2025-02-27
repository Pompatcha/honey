document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.querySelector(".dropdown-btn");
  const dropdownContent = document.querySelector(".dropdown-content");
  
  // Function to change language
  function changeLanguage(lang) {
      localStorage.setItem("selectedLanguage", lang);
      applyLanguage(lang);
  }

  // Function to apply stored language
  function applyLanguage(lang) {
      const translations = {
          en: { welcome: "Welcome", selectLanguage: "🌍 Select Language" },
          th: { welcome: "ยินดีต้อนรับ", selectLanguage: "🌍 เลือกภาษา" },
          jp: { welcome: "ようこそ", selectLanguage: "🌍 言語を選択" },
          cn: { welcome: "欢迎", selectLanguage: "🌍 选择语言" }
      };
      
      document.querySelector(".dropdown-btn").textContent = translations[lang].selectLanguage;
      document.querySelector("#welcome-text").textContent = translations[lang].welcome;
  }

  // Load stored language preference
  const storedLanguage = localStorage.getItem("selectedLanguage") || "en";
  applyLanguage(storedLanguage);

  // Add event listeners to language options
  document.querySelectorAll(".dropdown-content a").forEach(item => {
      item.addEventListener("click", function (event) {
          event.preventDefault();
          const lang = this.getAttribute("onclick").match(/'(.*?)'/)[1];
          changeLanguage(lang);
      });
  });
});
