/* ==========================
   Works - Case Filter
========================== */

const caseFilterButtons = document.querySelectorAll(
  ".case-filter__button"
);

const caseCards = document.querySelectorAll(
  ".case-card"
);

caseFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    caseFilterButtons.forEach((filterButton) => {
      filterButton.classList.remove("is-active");
    });

    button.classList.add("is-active");

    caseCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      const shouldShow =
        selectedFilter === "all" ||
        selectedFilter === cardCategory;

      card.hidden = !shouldShow;
    });
  });
});


/* ==========================
   Case Detail - Gallery
========================== */

const gallerySlides = document.querySelectorAll(
  ".case-gallery__slide"
);

const galleryDots = document.querySelectorAll(
  ".case-gallery__dot"
);

const galleryTrack = document.querySelector(
  ".case-gallery__track"
);

const galleryPrevButton = document.querySelector(
  ".case-gallery__arrow--prev"
);

const galleryNextButton = document.querySelector(
  ".case-gallery__arrow--next"
);

let currentGalleryIndex = 0;

const showGallerySlide = (index) => {
  gallerySlides.forEach((slide) => {
    slide.classList.remove("is-active");
  });

  galleryDots.forEach((dot) => {
    dot.classList.remove("is-active");
  });

  gallerySlides[index].classList.add("is-active");
  galleryDots[index].classList.add("is-active");

  if (galleryTrack) {
    galleryTrack.style.transform =
      `translateX(-${index * 100}%)`;
  }

  currentGalleryIndex = index;
};

if (
  gallerySlides.length > 0 &&
  galleryDots.length > 0 &&
  galleryTrack &&
  galleryPrevButton &&
  galleryNextButton
) {
  galleryNextButton.addEventListener("click", () => {
    let nextIndex = currentGalleryIndex + 1;

    if (nextIndex >= gallerySlides.length) {
      nextIndex = 0;
    }

    showGallerySlide(nextIndex);
  });

  galleryPrevButton.addEventListener("click", () => {
    let prevIndex = currentGalleryIndex - 1;

    if (prevIndex < 0) {
      prevIndex = gallerySlides.length - 1;
    }

    showGallerySlide(prevIndex);
  });

  galleryDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showGallerySlide(index);
    });
  });
}


/* ==========================
   Mobile Menu
========================== */

const menuButton = document.querySelector(
  ".menu-button"
);

const mobileMenu = document.querySelector(
  ".mobile-menu"
);

if (menuButton && mobileMenu) {
  const closeMenu = () => {
    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "メニューを開く"
    );

    mobileMenu.classList.remove("is-open");
    menuButton.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") ===
      "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "メニューを開く"
        : "メニューを閉じる"
    );

    mobileMenu.classList.toggle("is-open");
    menuButton.classList.toggle("is-open");
  });

  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener(
        "click",
        closeMenu
      );
    });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    }
  );

    document.addEventListener("click", (event) => {
    const isMenuOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    const clickedInsideMenu =
      mobileMenu.contains(event.target);

    const clickedMenuButton =
      menuButton.contains(event.target);

    if (
      isMenuOpen &&
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {
      closeMenu();
    }
  });

}


/* ==========================
   Contact Form Validation
========================== */

const contactForm = document.querySelector(
  "#contact-form"
);

if (contactForm) {
  const nameInput = contactForm.querySelector(
    "#name"
  );

  const emailInput = contactForm.querySelector(
    "#email"
  );

  const categorySelect = contactForm.querySelector(
    "#category"
  );

  const messageTextarea = contactForm.querySelector(
    "#message"
  );

  const privacyCheckbox = contactForm.querySelector(
    "#privacy"
  );

  const submitButton = contactForm.querySelector(
    ".contact-form__button"
  );

  const submitButtonText = contactForm.querySelector(
    ".contact-form__button-text"
  );

  const formStatus = document.querySelector(
    "#contact-form-status"
  );


  /* Error
  -------------------------- */

  const showError = (field, message) => {
    const errorElement = document.querySelector(
      `#${field.id}-error`
    );

    field.setAttribute(
      "aria-invalid",
      "true"
    );

    if (errorElement) {
      errorElement.textContent = message;
    }
  };

  const clearError = (field) => {
    const errorElement = document.querySelector(
      `#${field.id}-error`
    );

    field.removeAttribute(
      "aria-invalid"
    );

    if (errorElement) {
      errorElement.textContent = "";
    }
  };


  /* Validation
  -------------------------- */

  const validateName = () => {
    const value = nameInput.value.trim();

    if (value === "") {
      showError(
        nameInput,
        "お名前を入力してください。"
      );

      return false;
    }

    clearError(nameInput);

    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();

    if (value === "") {
      showError(
        emailInput,
        "メールアドレスを入力してください。"
      );

      return false;
    }

    if (!emailInput.validity.valid) {
      showError(
        emailInput,
        "メールアドレスの形式を確認してください。"
      );

      return false;
    }

    clearError(emailInput);

    return true;
  };

  const validateCategory = () => {
    if (categorySelect.value === "") {
      showError(
        categorySelect,
        "ご相談の種類を選択してください。"
      );

      return false;
    }

    clearError(categorySelect);

    return true;
  };

  const validateMessage = () => {
    const value =
      messageTextarea.value.trim();

    if (value === "") {
      showError(
        messageTextarea,
        "ご相談内容を入力してください。"
      );

      return false;
    }

    clearError(messageTextarea);

    return true;
  };

  const validatePrivacy = () => {
    if (!privacyCheckbox.checked) {
      showError(
        privacyCheckbox,
        "プライバシーポリシーへの同意が必要です。"
      );

      return false;
    }

    clearError(privacyCheckbox);

    return true;
  };


  /* Submit Status
  -------------------------- */

  const setSubmitting = () => {
    submitButton.disabled = true;

    submitButtonText.textContent =
      "送信しています…";

    formStatus.textContent =
      "お問い合わせ内容を送信しています。";
  };

  const setSuccess = () => {
    submitButton.disabled = true;

    submitButtonText.textContent =
      "送信しました";

    formStatus.textContent =
      "お問い合わせありがとうございます。送信が完了しました。";

    contactForm.reset();
  };

  const setError = () => {
    submitButton.disabled = false;

    submitButtonText.textContent =
      "相談内容を送信する";

    formStatus.textContent =
      "送信できませんでした。時間をおいて、もう一度お試しください。";
  };


  /* Submit
  -------------------------- */

  contactForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      const isNameValid =
        validateName();

      const isEmailValid =
        validateEmail();

      const isCategoryValid =
        validateCategory();

      const isMessageValid =
        validateMessage();

      const isPrivacyValid =
        validatePrivacy();

      const isFormValid =
        isNameValid &&
        isEmailValid &&
        isCategoryValid &&
        isMessageValid &&
        isPrivacyValid;

      if (!isFormValid) {
        const firstInvalidField =
          contactForm.querySelector(
            '[aria-invalid="true"]'
          );

        if (firstInvalidField) {
          firstInvalidField.focus();
        }

        return;
      }

      setSubmitting();

      try {
        const formData =
          new FormData(contactForm);

        const response = await fetch(
          contactForm.action,
          {
            method: contactForm.method,
            body: formData,
            headers: {
              Accept: "application/json"
            }
          }
        );

        if (response.ok) {
          setSuccess();
        } else {
          setError();
        }
      } catch (error) {
        console.error(
          "フォーム送信エラー:",
          error
        );

        setError();
      }
    }
  );


  /* Field Events
  -------------------------- */

  nameInput.addEventListener(
    "blur",
    validateName
  );

  emailInput.addEventListener(
    "blur",
    validateEmail
  );

  categorySelect.addEventListener(
    "change",
    validateCategory
  );

  messageTextarea.addEventListener(
    "blur",
    validateMessage
  );

  privacyCheckbox.addEventListener(
    "change",
    validatePrivacy
  );
}


/* ==========================
   Case Detail - Title Line Animation
========================== */

const caseSectionTitles =
  document.querySelectorAll(
    [
      ".case-process__title",
      ".case-gallery__title",
      ".case-info__title"
    ].join(",")
  );

if (caseSectionTitles.length > 0) {
  const titleLineObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "is-line-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.4
      }
    );

  caseSectionTitles.forEach((title) => {
    titleLineObserver.observe(title);
  });
}


/* ==========================
   Scroll Reveal
========================== */

const revealSelectors = [
  /* Top Page */
  ".about__body",
  ".about__image",
  ".works-card",
  ".flow__item",
  ".contact__text",
  ".contact-button-wrap",

  /* Works Page */
  ".works-hero__content",
  ".featured-case__visual",
  ".featured-case__content",
  ".find-case__content",
  ".find-case-card",
  ".case-card",
  ".how-we-work__content",
  ".how-step",

  /* Case Detail */
  ".case-detail-hero__content",
  ".case-detail-hero__visual",
  ".case-process__item",
  ".case-gallery__slider",
  ".case-info__grid",
  ".case-info__summary",
  ".case-cta__inner",

  /* Contact */
  ".contact-hero__inner",
  ".contact-form__field",
  ".contact-form__privacy",
  ".contact-form__submit",

  /* Privacy */
  ".privacy-hero__inner",
  ".privacy-policy__section"
];

const revealElements =
  document.querySelectorAll(
    revealSelectors.join(",")
  );

if (revealElements.length > 0) {

  /* Reveal Class
  -------------------------- */

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });


  /* Stagger Animation
  -------------------------- */

  const staggerGroups = [
    ".works__grid",
    ".case-list__grid",
    ".how-we-work__steps",
    ".case-process__list"
  ];

  staggerGroups.forEach(
    (groupSelector) => {
      const groups =
        document.querySelectorAll(
          groupSelector
        );

      groups.forEach((group) => {
        const children =
          group.querySelectorAll(
            ".reveal"
          );

        children.forEach(
          (child, index) => {
            child.style.transitionDelay =
              `${index * 0.12}s`;
          }
        );
      });
    }
  );


  /* Intersection Observer
  -------------------------- */

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}