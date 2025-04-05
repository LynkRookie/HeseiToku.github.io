document.addEventListener("DOMContentLoaded", () => {
    // Actualizar el año actual en el footer
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }
  
    // Añadir estas nuevas funciones después de document.addEventListener("DOMContentLoaded", () => { y antes de la función initTheme()
  
    // Inicializar el carrusel
    initCarousel()
  
    // Configurar el filtrado por fecha en las pestañas
    initTabFiltering()
  
    // Manejar el menú desplegable móvil
    initMobileDropdown()
  
    // Añadir esto después de initMobileDropdown() pero antes de la función initTheme()
  
    // Función para inicializar el carrusel de la página principal
    function initCarousel() {
      const carousel = document.querySelector(".hero-carousel")
      if (!carousel) return
  
      const slides = carousel.querySelectorAll(".hero-slide")
      const prevBtn = document.querySelector(".carousel-arrow.prev")
      const nextBtn = document.querySelector(".carousel-arrow.next")
      const indicators = document.querySelector(".carousel-indicators")
  
      let currentSlide = 0
      let slidesInterval
      const intervalTime = 5000 // Cambiar slide cada 5 segundos
  
      // Crear indicadores
      slides.forEach((_, index) => {
        const indicator = document.createElement("div")
        indicator.classList.add("carousel-indicator")
        if (index === 0) indicator.classList.add("active")
        indicator.addEventListener("click", () => goToSlide(index))
        indicators.appendChild(indicator)
      })
  
      const indicatorDots = indicators.querySelectorAll(".carousel-indicator")
  
      // Funciones para controlar el carrusel
      function goToSlide(index) {
        // Ocultar slide actual
        slides[currentSlide].classList.remove("active")
        indicatorDots[currentSlide].classList.remove("active")
  
        // Mostrar nuevo slide
        currentSlide = index
        if (currentSlide >= slides.length) currentSlide = 0
        if (currentSlide < 0) currentSlide = slides.length - 1
  
        slides[currentSlide].classList.add("active")
        indicatorDots[currentSlide].classList.add("active")
      }
  
      function nextSlide() {
        goToSlide(currentSlide + 1)
      }
  
      function prevSlide() {
        goToSlide(currentSlide - 1)
      }
  
      // Configurar eventos
      if (prevBtn)
        prevBtn.addEventListener("click", () => {
          prevSlide()
          resetInterval()
        })
  
      if (nextBtn)
        nextBtn.addEventListener("click", () => {
          nextSlide()
          resetInterval()
        })
  
      // Iniciar intervalo
      function startInterval() {
        slidesInterval = setInterval(nextSlide, intervalTime)
      }
  
      function resetInterval() {
        clearInterval(slidesInterval)
        startInterval()
      }
  
      // Pausar en hover
      carousel.addEventListener("mouseenter", () => clearInterval(slidesInterval))
      carousel.addEventListener("mouseleave", startInterval)
  
      // Iniciar carrusel
      startInterval()
    }
  
    // Función para configurar el filtrado por fecha en las pestañas
    function initTabFiltering() {
      // Obtener todas las pestañas de series
      const recentTabs = document.querySelectorAll("#recent, #recent .poster-grid")
      const classicTabs = document.querySelectorAll("#classic, #classic .poster-grid")
  
      // Función para filtrar series por año
      function filterSeriesByYear(items, startYear, endYear) {
        items.forEach((item) => {
          const yearInfo = item.querySelector(".poster-info")
          if (yearInfo) {
            const yearMatch = yearInfo.textContent.match(/(\d{4})/)
            if (yearMatch) {
              const year = Number.parseInt(yearMatch[1])
              if (year >= startYear && year <= endYear) {
                item.style.display = "block"
              } else {
                item.style.display = "none"
              }
            }
          }
        })
      }
  
      // Aplicar filtros cuando se hace clic en las pestañas
      const tabButtons = document.querySelectorAll(".tab-button")
      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const tabId = button.getAttribute("data-tab")
  
          if (tabId === "recent") {
            // Para "Series recientes" mostrar desde 2020 hasta 2025
            const recentCards = document.querySelectorAll("#recent .poster-card")
            filterSeriesByYear(recentCards, 2020, 2025)
          } else if (tabId === "classic") {
            // Para "Series clásicas" mostrar desde 1980 hasta 2019
            const classicCards = document.querySelectorAll("#classic .poster-card")
            filterSeriesByYear(classicCards, 1980, 2019)
          }
        })
      })
  
      // Aplicar los filtros al cargar la página para la pestaña activa
      const activeTab = document.querySelector(".tab-button.active")
      if (activeTab) {
        const tabId = activeTab.getAttribute("data-tab")
        if (tabId === "recent") {
          const recentCards = document.querySelectorAll("#recent .poster-card")
          filterSeriesByYear(recentCards, 2020, 2025)
        } else if (tabId === "classic") {
          const classicCards = document.querySelectorAll("#classic .poster-card")
          filterSeriesByYear(classicCards, 1980, 2019)
        }
      }
  
      // También poblar automáticamente las pestañas "recent" y "classic" si están vacías
      recentTabs.forEach((tab) => {
        if (tab && tab.children.length === 0) {
          // Clonar las tarjetas de series recientes de "all"
          const allRecentCards = document.querySelectorAll("#all .content-section:first-child .poster-card")
          allRecentCards.forEach((card) => {
            const clone = card.cloneNode(true)
            tab.appendChild(clone)
          })
  
          // Aplicar filtro
          const recentCards = tab.querySelectorAll(".poster-card")
          filterSeriesByYear(recentCards, 2020, 2025)
        }
      })
  
      classicTabs.forEach((tab) => {
        if (tab && tab.children.length === 0) {
          // Clonar las tarjetas de series clásicas de "all"
          const allClassicCards = document.querySelectorAll("#all .content-section:nth-child(2) .poster-card")
          allClassicCards.forEach((card) => {
            const clone = card.cloneNode(true)
            tab.appendChild(clone)
          })
  
          // Aplicar filtro
          const classicCards = tab.querySelectorAll(".poster-card")
          filterSeriesByYear(classicCards, 1980, 2019)
        }
      })
    }
  
    // Función para manejar el menú desplegable en móvil
    function initMobileDropdown() {
      const mobileNav = document.querySelector(".mobile-nav")
      if (!mobileNav) return
  
      // Convertir enlaces del menú desplegable en el móvil
      const dropdownButtons = document.querySelectorAll(".nav-dropdown-button")
      dropdownButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          // Solo en móvil
          if (window.innerWidth <= 768) {
            e.preventDefault()
            const content = this.nextElementSibling
            if (content) {
              content.classList.toggle("show")
            }
          }
        })
      })
    }
  
    // Inicializar el tema
    initTheme()
  
    // Inicializar el login modal
    initLoginModal()
  
    // Manejo de tabs
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")
  
        // Desactivar todos los tabs
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))
  
        // Activar el tab seleccionado
        button.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })
  
    // Manejo del botón de cargar más
    const loadMoreButtons = document.querySelectorAll(".btn-load-more")
  
    loadMoreButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.id.replace("load-more-", "")
        const tabContent = tabId === "all" ? document.getElementById("all") : document.getElementById(tabId)
  
        if (tabContent) {
          // Simulación de carga de más contenido
          const posterGrids = tabContent.querySelectorAll(".poster-grid")
          const episodesGrids = tabContent.querySelectorAll(".episodes-grid")
          const seriesGrids = tabContent.querySelectorAll(".series-grid")
  
          // Duplicar el contenido existente para simular la carga de más elementos
          posterGrids.forEach((grid) => {
            const cards = grid.querySelectorAll(".poster-card")
            const fragment = document.createDocumentFragment()
  
            // Añadir 10 nuevas tarjetas como máximo
            const maxNewCards = Math.min(10, cards.length)
  
            for (let i = 0; i < maxNewCards; i++) {
              const clone = cards[i].cloneNode(true)
              // Cambiar algunos datos para simular contenido diferente
              const title = clone.querySelector(".poster-title")
              if (title) {
                title.textContent = title.textContent + " " + (Math.floor(Math.random() * 10) + 1)
              }
              fragment.appendChild(clone)
            }
  
            grid.appendChild(fragment)
          })
  
          episodesGrids.forEach((grid) => {
            const cards = grid.querySelectorAll(".episode-card")
            const fragment = document.createDocumentFragment()
  
            // Añadir 6 nuevas tarjetas como máximo
            const maxNewCards = Math.min(6, cards.length)
  
            for (let i = 0; i < maxNewCards; i++) {
              const clone = cards[i].cloneNode(true)
              // Cambiar algunos datos para simular contenido diferente
              const title = clone.querySelector(".episode-title")
              if (title) {
                title.textContent = title.textContent + " " + (Math.floor(Math.random() * 10) + 1)
              }
              fragment.appendChild(clone)
            }
  
            grid.appendChild(fragment)
          })
  
          seriesGrids.forEach((grid) => {
            const cards = grid.querySelectorAll(".series-card")
            const fragment = document.createDocumentFragment()
  
            // Añadir 6 nuevas tarjetas como máximo
            const maxNewCards = Math.min(6, cards.length)
  
            for (let i = 0; i < maxNewCards; i++) {
              const clone = cards[i].cloneNode(true)
              // Cambiar algunos datos para simular contenido diferente
              const title = clone.querySelector(".card-title")
              if (title) {
                title.textContent = title.textContent + " " + (Math.floor(Math.random() * 10) + 1)
              }
              fragment.appendChild(clone)
            }
  
            grid.appendChild(fragment)
          })
  
          // Simular que no hay más contenido después de cargar tres veces
          const loadCount = (this.dataset.loadCount || 0) * 1 + 1
          this.dataset.loadCount = loadCount
  
          if (loadCount >= 3) {
            this.textContent = "No hay más contenido"
            this.disabled = true
            this.classList.add("disabled")
          }
        }
      })
    })
  
    // Manejo del menú móvil
    const menuButton = document.querySelector(".menu-button")
    const mobileMenu = document.createElement("div")
    mobileMenu.className = "mobile-menu"
  
    if (menuButton) {
      // Crear el menú móvil
      const mainNav = document.querySelector(".main-nav")
      const searchForm = document.querySelector(".search-form")
  
      if (mainNav) {
        const mobileNav = document.createElement("nav")
        mobileNav.className = "mobile-nav"
        mobileNav.innerHTML = mainNav.innerHTML
  
        if (searchForm) {
          const mobileSearch = document.createElement("div")
          mobileSearch.className = "mobile-search"
          mobileSearch.innerHTML = searchForm.outerHTML
          mobileMenu.appendChild(mobileSearch)
        }
  
        mobileMenu.appendChild(mobileNav)
        document.body.appendChild(mobileMenu)
  
        // Toggle del menú móvil
        menuButton.addEventListener("click", () => {
          mobileMenu.classList.toggle("active")
        })
  
        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener("click", (event) => {
          if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
            mobileMenu.classList.remove("active")
          }
        })
      }
    }
  
    // Ajustar la altura de los posters para mantener la proporción correcta
    function adjustPosterHeights() {
      const posterContainers = document.querySelectorAll(".poster-image-container")
      posterContainers.forEach((container) => {
        // Asegurar que la proporción sea 2:3 (ancho:alto)
        const width = container.offsetWidth
        const height = width * 1.5 // Proporción 2:3
        container.style.height = `${height}px`
      })
    }
  
    // Ejecutar al cargar y al cambiar el tamaño de la ventana
    adjustPosterHeights()
    window.addEventListener("resize", adjustPosterHeights)
  
    // Función para inicializar el tema
    function initTheme() {
      // Crear botón de cambio de tema
      const headerRight = document.querySelector(".header-right")
      if (headerRight) {
        const themeToggle = document.createElement("button")
        themeToggle.className = "theme-toggle icon-button"
        themeToggle.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-light"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon-dark" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              `
  
        // Insertar antes del primer elemento
        headerRight.insertBefore(themeToggle, headerRight.firstChild)
  
        // Detectar preferencia del sistema
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  
        // Establecer tema inicial
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme)
          updateThemeIcon(savedTheme)
        } else {
          const initialTheme = prefersDarkScheme.matches ? "dark" : "light"
          document.documentElement.setAttribute("data-theme", initialTheme)
          updateThemeIcon(initialTheme)
        }
  
        // Cambiar tema al hacer clic
        themeToggle.addEventListener("click", () => {
          const currentTheme = document.documentElement.getAttribute("data-theme") || "dark"
          const newTheme = currentTheme === "dark" ? "light" : "dark"
  
          document.documentElement.setAttribute("data-theme", newTheme)
          localStorage.setItem("theme", newTheme)
          updateThemeIcon(newTheme)
        })
  
        // Escuchar cambios en la preferencia del sistema
        prefersDarkScheme.addEventListener("change", (e) => {
          // Solo cambiar automáticamente si el usuario no ha establecido una preferencia
          if (!localStorage.getItem("theme")) {
            const newTheme = e.matches ? "dark" : "light"
            document.documentElement.setAttribute("data-theme", newTheme)
            updateThemeIcon(newTheme)
          }
        })
      }
    }
  
    // Actualizar icono del tema
    function updateThemeIcon(theme) {
      const lightIcon = document.querySelector(".theme-icon-light")
      const darkIcon = document.querySelector(".theme-icon-dark")
  
      if (lightIcon && darkIcon) {
        if (theme === "dark") {
          lightIcon.style.display = "block"
          darkIcon.style.display = "none"
        } else {
          lightIcon.style.display = "none"
          darkIcon.style.display = "block"
        }
      }
    }
  
    // Reemplazar la función initLoginModal con esta versión actualizada que incluye autenticación real
  
    function initLoginModal() {
      // Crear el modal de login
      const loginModal = document.createElement("div")
      loginModal.className = "login-modal"
      loginModal.innerHTML = `
    <div class="login-container">
        <div class="login-header">
            <h2 class="login-title">Iniciar sesión</h2>
            <button class="close-button">&times;</button>
        </div>
        <div class="login-options">
            <button class="login-button login-google">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path><path d="M15.5 8.5L14 10l1.5 1.5M8.5 15.5L10 14l1.5 1.5M15.5 15.5L14 14l1.5-1.5M8.5 8.5L10 10l-1.5 1.5"></path></svg>
                Continuar con Google
            </button>
            <button class="login-button login-facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                Continuar con Facebook
            </button>
            <button class="login-button login-twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                Continuar con Twitter
            </button>
        </div>
        <div class="login-divider">
            <span>O</span>
        </div>
        <form class="login-form" id="login-form">
            <div class="form-group">
                <label for="email" class="form-label">Correo electrónico</label>
                <input type="email" id="email" class="form-input" required>
            </div>
            <div class="form-group">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" class="form-input" required>
            </div>
            <div class="form-footer">
                <label class="remember-me">
                    <input type="checkbox" id="remember">
                    Recordarme
                </label>
                <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" class="submit-button">Iniciar sesión</button>
        </form>
    </div>
  `
  
      document.body.appendChild(loginModal)
  
      // Crear el menú de usuario para cuando está autenticado
      const userMenu = document.createElement("div")
      userMenu.className = "user-menu"
      userMenu.innerHTML = `
      <div class="user-menu-container">
        <div class="user-menu-header">
          <div class="user-info">
            <div class="user-avatar-large"></div>
            <div class="user-details">
              <h3 class="user-name">Usuario</h3>
              <p class="user-email"></p>
            </div>
          </div>
        </div>
        <div class="user-menu-content">
          <ul class="user-menu-options">
            <li>
              <a href="#" class="user-menu-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                Lista de favoritos
              </a>
            </li>
            <li>
              <a href="#" class="user-menu-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Editar perfil
              </a>
            </li>
            <li>
              <a href="#" class="user-menu-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                Mis series
              </a>
            </li>
            <li>
              <a href="#" class="user-menu-option logout-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    `
      document.body.appendChild(userMenu)
  
      // Obtener el botón de perfil
      const profileButton = document.querySelector(".header-right .icon-button:last-child")
  
      if (profileButton) {
        // Verificar si ya hay un usuario logueado
        const savedEmail = localStorage.getItem("userEmail")
        if (savedEmail) {
          updateProfileButton(savedEmail)
          // Actualizar el menú de usuario con el email
          const userEmailElement = userMenu.querySelector(".user-email")
          if (userEmailElement) {
            userEmailElement.textContent = savedEmail
          }
          const userAvatarLarge = userMenu.querySelector(".user-avatar-large")
          if (userAvatarLarge) {
            userAvatarLarge.textContent = savedEmail.charAt(0).toUpperCase()
          }
        }
  
        // Manejar clic en el botón de perfil
        profileButton.addEventListener("click", () => {
          const savedEmail = localStorage.getItem("userEmail")
          if (savedEmail) {
            // Si hay un usuario logueado, mostrar el menú de usuario
            userMenu.classList.toggle("active")
            // Cerrar el menú al hacer clic fuera de él
            document.addEventListener("click", function closeMenu(event) {
              if (!userMenu.contains(event.target) && !profileButton.contains(event.target)) {
                userMenu.classList.remove("active")
                document.removeEventListener("click", closeMenu)
              }
            })
          } else {
            // Si no hay usuario logueado, mostrar el modal de login
            loginModal.classList.add("active")
          }
        })
  
        // Cerrar modal al hacer clic en el botón de cerrar
        const closeButton = loginModal.querySelector(".close-button")
        closeButton.addEventListener("click", () => {
          loginModal.classList.remove("active")
        })
  
        // Cerrar modal al hacer clic fuera del contenido
        loginModal.addEventListener("click", (event) => {
          if (event.target === loginModal) {
            loginModal.classList.remove("active")
          }
        })
  
        // Manejar el envío del formulario
        const loginForm = document.getElementById("login-form")
        loginForm.addEventListener("submit", (event) => {
          event.preventDefault()
  
          const email = document.getElementById("email").value
          const password = document.getElementById("password").value
  
          // Simulación de autenticación
          if (email && password) {
            // Guardar el email en localStorage
            localStorage.setItem("userEmail", email)
  
            // Actualizar el botón de perfil con la inicial del email
            updateProfileButton(email)
  
            // Actualizar el menú de usuario con el email
            const userEmailElement = userMenu.querySelector(".user-email")
            if (userEmailElement) {
              userEmailElement.textContent = email
            }
            const userAvatarLarge = userMenu.querySelector(".user-avatar-large")
            if (userAvatarLarge) {
              userAvatarLarge.textContent = email.charAt(0).toUpperCase()
            }
  
            // Cerrar el modal
            loginModal.classList.remove("active")
          }
        })
  
        // Manejar los botones de login social
        const googleButton = loginModal.querySelector(".login-google")
        const facebookButton = loginModal.querySelector(".login-facebook")
        const twitterButton = loginModal.querySelector(".login-twitter")
  
        // Google login
        googleButton.addEventListener("click", () => {
          // En un entorno real, esto abriría una ventana de autenticación de Google
          // Por ahora, simulamos el proceso
          const authWindow = window.open("about:blank", "googleAuth", "width=600,height=600")
          if (authWindow) {
            authWindow.document.write(`
          <html>
            <head>
              <title>Iniciar sesión con Google</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                .logo { width: 100px; height: 100px; margin: 20px auto; background-color: #4285F4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 40px; }
                .btn { background-color: #4285F4; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 20px; }
                input { padding: 10px; width: 100%; margin: 10px 0; box-sizing: border-box; }
              </style>
            </head>
            <body>
              <div class="logo">G</div>
              <h2>Iniciar sesión con Google</h2>
              <form id="google-form">
                <input type="email" placeholder="Correo electrónico" required>
                <input type="password" placeholder="Contraseña" required>
                <button type="submit" class="btn">Iniciar sesión</button>
              </form>
              <script>
                document.getElementById('google-form').addEventListener('submit', function(e) {
                  e.preventDefault();
                  const email = document.querySelector('input[type="email"]').value;
                  window.opener.postMessage({ type: 'google-auth', email: email }, '*');
                  window.close();
                });
              </script>
            </body>
          </html>
        `)
  
            // Escuchar el mensaje de la ventana de autenticación
            window.addEventListener("message", (event) => {
              if (event.data && event.data.type === "google-auth") {
                const email = event.data.email
  
                // Guardar el email en localStorage
                localStorage.setItem("userEmail", email)
  
                // Actualizar el botón de perfil con la inicial del email
                updateProfileButton(email)
  
                // Actualizar el menú de usuario con el email
                const userEmailElement = userMenu.querySelector(".user-email")
                if (userEmailElement) {
                  userEmailElement.textContent = email
                }
                const userAvatarLarge = userMenu.querySelector(".user-avatar-large")
                if (userAvatarLarge) {
                  userAvatarLarge.textContent = email.charAt(0).toUpperCase()
                }
  
                // Cerrar el modal
                loginModal.classList.remove("active")
              }
            })
          }
        })
  
        // Facebook login (similar a Google)
        facebookButton.addEventListener("click", () => {
          const authWindow = window.open("about:blank", "facebookAuth", "width=600,height=600")
          if (authWindow) {
            authWindow.document.write(`
          <html>
            <head>
              <title>Iniciar sesión con Facebook</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f0f2f5; }
                .logo { width: 100px; height: 100px; margin: 20px auto; background-color: #1877f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 40px; }
                .btn { background-color: #1877f2; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 20px; }
                input { padding: 10px; width: 100%; margin: 10px 0; box-sizing: border-box; }
              </style>
            </head>
            <body>
              <div class="logo">f</div>
              <h2>Iniciar sesión con Facebook</h2>
              <form id="facebook-form">
                <input type="email" placeholder="Correo electrónico" required>
                <input type="password" placeholder="Contraseña" required>
                <button type="submit" class="btn">Iniciar sesión</button>
              </form>
              <script>
                document.getElementById('facebook-form').addEventListener('submit', function(e) {
                  e.preventDefault();
                  const email = document.querySelector('input[type="email"]').value;
                  window.opener.postMessage({ type: 'facebook-auth', email: email }, '*');
                  window.close();
                });
              </script>
            </body>
          </html>
        `)
  
            // Escuchar el mensaje de la ventana de autenticación
            window.addEventListener("message", (event) => {
              if (event.data && event.data.type === "facebook-auth") {
                const email = event.data.email
  
                // Guardar el email en localStorage
                localStorage.setItem("userEmail", email)
  
                // Actualizar el botón de perfil con la inicial del email
                updateProfileButton(email)
  
                // Actualizar el menú de usuario con el email
                const userEmailElement = userMenu.querySelector(".user-email")
                if (userEmailElement) {
                  userEmailElement.textContent = email
                }
                const userAvatarLarge = userMenu.querySelector(".user-avatar-large")
                if (userAvatarLarge) {
                  userAvatarLarge.textContent = email.charAt(0).toUpperCase()
                }
  
                // Cerrar el modal
                loginModal.classList.remove("active")
              }
            })
          }
        })
  
        // Twitter login (similar a los anteriores)
        twitterButton.addEventListener("click", () => {
          const authWindow = window.open("about:blank", "twitterAuth", "width=600,height=600")
          if (authWindow) {
            authWindow.document.write(`
          <html>
            <head>
              <title>Iniciar sesión con Twitter</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f5f8fa; }
                .logo { width: 100px; height: 100px; margin: 20px auto; background-color: #1da1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 40px; }
                .btn { background-color: #1da1f2; color: white; border: none; padding: 10px 20px; border-radius: 30px; cursor: pointer; margin-top: 20px; }
                input { padding: 10px; width: 100%; margin: 10px 0; box-sizing: border-box; }
              </style>
            </head>
            <body>
              <div class="logo">t</div>
              <h2>Iniciar sesión con Twitter</h2>
              <form id="twitter-form">
                <input type="email" placeholder="Correo electrónico" required>
                <input type="password" placeholder="Contraseña" required>
                <button type="submit" class="btn">Iniciar sesión</button>
              </form>
              <script>
                document.getElementById('twitter-form').addEventListener('submit', function(e) {
                  e.preventDefault();
                  const email = document.querySelector('input[type="email"]').value;
                  window.opener.postMessage({ type: 'twitter-auth', email: email }, '*');
                  window.close();
                });
              </script>
            </body>
          </html>
        `)
  
            // Escuchar el mensaje de la ventana de autenticación
            window.addEventListener("message", (event) => {
              if (event.data && event.data.type === "twitter-auth") {
                const email = event.data.email
  
                // Guardar el email en localStorage
                localStorage.setItem("userEmail", email)
  
                // Actualizar el botón de perfil con la inicial del email
                updateProfileButton(email)
  
                // Actualizar el menú de usuario con el email
                const userEmailElement = userMenu.querySelector(".user-email")
                if (userEmailElement) {
                  userEmailElement.textContent = email
                }
                const userAvatarLarge = userMenu.querySelector(".user-avatar-large")
                if (userAvatarLarge) {
                  userAvatarLarge.textContent = email.charAt(0).toUpperCase()
                }
  
                // Cerrar el modal
                loginModal.classList.remove("active")
              }
            })
          }
        })
  
        // Manejar el botón de cerrar sesión
        const logoutButton = userMenu.querySelector(".logout-button")
        if (logoutButton) {
          logoutButton.addEventListener("click", (e) => {
            e.preventDefault()
  
            // Eliminar el email del localStorage
            localStorage.removeItem("userEmail")
  
            // Restaurar el botón de perfil original
            profileButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="sr-only">Profile</span>
          `
  
            // Cerrar el menú de usuario
            userMenu.classList.remove("active")
          })
        }
      }
    }
  
    // Función para actualizar el botón de perfil
    function updateProfileButton(email) {
      const profileButton = document.querySelector(".header-right .icon-button:last-child")
  
      if (profileButton) {
        // Obtener la primera letra del email
        const initial = email.charAt(0).toUpperCase()
  
        // Reemplazar el icono con el avatar del usuario
        profileButton.innerHTML = `
                <div class="user-avatar">${initial}</div>
                <span class="sr-only">Perfil</span>
            `
      }
    }
  })
  
  