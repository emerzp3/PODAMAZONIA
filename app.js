const PERU_LOCATIONS = {
    "Amazonas": ["Chachapoyas", "Bagua", "Bongará", "Condorcanqui", "Luya", "Rodríguez de Mendoza", "Utcubamba"],
    "Áncash": ["Huaraz", "Aija", "Antonio Raymondi", "Asunción", "Bolognesi", "Carhuaz", "Carlos Fermín Fitzcarrald", "Casma", "Corongo", "Huari", "Huarmey", "Huaylas", "Mariscal Luzuriaga", "Ocros", "Pallasca", "Pomabamba", "Recuay", "Santa", "Sihuas", "Yungay"],
    "Apurímac": ["Abancay", "Andahuaylas", "Antabamba", "Aymaraes", "Cotabambas", "Chincheros", "Grau"],
    "Arequipa": ["Arequipa", "Camaná", "Caravelí", "Castilla", "Caylloma", "Condesuyos", "Islay", "La Unión"],
    "Ayacucho": ["Huamanga", "Cangallo", "Huanca Sancos", "Huanta", "La Mar", "Lucanas", "Parinacochas", "Páucar del Sara Sara", "Sucre", "Víctor Fajardo", "Vilcas Huamán"],
    "Cajamarca": ["Cajamarca", "Cajabamba", "Celendín", "Chota", "Contumazá", "Cutervo", "Hualgayoc", "Jaén", "San Ignacio", "San Marcos", "San Miguel", "San Pablo", "Santa Cruz"],
    "Callao": ["Callao", "Bellavista", "Carmen de La Legua", "La Perla", "La Punta", "Ventanilla", "Mi Perú"],
    "Cusco": ["Cusco", "Acomayo", "Anta", "Calca", "Canas", "Canchis", "Chumbivilcas", "Espinar", "La Convención", "Paruro", "Paucartambo", "Quispicanchi", "Urubamba"],
    "Huancavelica": ["Huancavelica", "Acobamba", "Angaraes", "Castrovirreyna", "Churcampa", "Huaytará", "Tayacaja"],
    "Huánuco": ["Huánuco", "Ambo", "Dos de Mayo", "Huacaybamba", "Huamalíes", "Leoncio Prado", "Marañón", "Pachitea", "Puerto Inca", "Lauricocha", "Yarowilca"],
    "Ica": ["Ica", "Chincha", "Nazca", "Palpa", "Pisco"],
    "Junín": ["Huancayo", "Concepción", "Chanchamayo", "Jauja", "Junín", "Satipo", "Tarma", "Yauli", "Chupaca"],
    "La Libertad": ["Trujillo", "Ascope", "Bolívar", "Chepén", "Julcán", "Otuzco", "Pacasmayo", "Pataz", "Sánchez Carrión", "Santiago de Chuco", "Gran Chimú", "Virú"],
    "Lambayeque": ["Chiclayo", "Ferreñafe", "Lambayeque"],
    "Lima (Distritos)": ["Lima (Cercado)", "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo", "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia", "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos", "Lurigancho", "Lurín", "Magdalena del Mar", "Miraflores", "Pachacámac", "Pucusana", "Pueblo Libre", "Puente Piedra", "Punta Hermosa", "Punta Negra", "Rímac", "San Bartolo", "San Borja", "San Isidro", "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis", "San Martín de Porres", "San Miguel", "Santa Anita", "Santa María del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo", "Villa El Salvador", "Villa María del Triunfo"],
    "Lima (Provincias)": ["Barranca", "Cajatambo", "Canta", "Cañete", "Huaral", "Huarochirí", "Huaura", "Oyón", "Yauyos"],
    "Loreto": ["Maynas", "Alto Amazonas", "Loreto", "Mariscal Ramón Castilla", "Requena", "Ucayali (Contamana)", "Contamana", "Datem del Marañón", "Putumayo"],
    "Madre de Dios": ["Tambopata", "Manu", "Tahuamanu"],
    "Moquegua": ["Mariscal Nieto", "General Sánchez Cerro", "Ilo"],
    "Pasco": ["Pasco", "Daniel Alcides Carrión", "Oxapampa"],
    "Piura": ["Piura", "Ayabaca", "Huancabamba", "Morropón", "Paita", "Sullana", "Talara", "Sechura"],
    "Puno": ["Puno", "Azángaro", "Carabaya", "Chucuito", "El Collao", "Huancané", "Lampa", "Melgar", "Moho", "San Antonio de Putina", "San Román", "Sandia", "Yunguyo"],
    "San Martín": ["Moyobamba", "Bellavista", "El Dorado", "Huallaga", "Lamas", "Mariscal Cáceres", "Picota", "Rioja", "San Martín", "Tocache"],
    "Tacna": ["Tacna", "Candarave", "Jorge Basadre", "Tarata"],
    "Tumbes": ["Tumbes", "Contralmirante Villar", "Zarumilla"],
    "Ucayali": ["Coronel Portillo", "Atalaya", "Padre Abad", "Purús"]
};

document.addEventListener('DOMContentLoaded', () => {
    // ======== STATE ========
    let products = window.STORE_PRODUCTS || [];
    let cart = []; // Array of { cartKey, product, optionsText, finalPrice, quantity }
    let subtotalCents = 0;
    let selectedShippingCost = 0;
    let isFreeShippingActive = false;
    let deliveryMapCoordinates = "";
    
    // ======== DOM ELEMENTS ========
    const productGrid = document.getElementById('product-grid');
    const emptyState = document.getElementById('empty-state');
    const categoryBtns = document.querySelectorAll('.filter-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    // Cart DOM
    const cartTglBtn = document.getElementById('cart-tgl-btn');
    const cartCountEl = document.getElementById('cart-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const checkoutProcessBtn = document.getElementById('checkout-process-btn');
    
    // Checkout DOM
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutCloseBtn = document.getElementById('checkout-close');
    const checkoutForm = document.getElementById('checkout-form');
    const paySubmitBtn = document.getElementById('pay-submit-btn');

    const regionSelect = document.getElementById('checkout-region');
    const distritoSelect = document.getElementById('checkout-distrito');
    const expiryInput = document.getElementById('tarjeta-venc');
    
    // Toast DOM
    const toastContainer = document.getElementById('toast-container');

    // Product Modal DOM
    const productModal = document.getElementById('product-modal');
    const productModalClose = document.getElementById('product-close');
    const productModalBody = document.getElementById('product-modal-body');

    // ======== NAVIGATION LOGIC ========
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            mainNav.classList.remove('show');
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });

    const logoHomeLink = document.getElementById('logo-home-link');
    if (logoHomeLink) {
        logoHomeLink.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            const tiendaLink = Array.from(navLinks).find(l => l.getAttribute('href') === '#tienda');
            if (tiendaLink) tiendaLink.classList.add('active');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById('tienda').classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ======== UTILS ========
    function parsePrice(priceStr) {
        return parseFloat(priceStr.replace('S/', '').trim()) || 0;
    }
    
    function formatPrice(number) {
        return `S/ ${number.toFixed(2)}`;
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ======== STORE RENDER ========
    function renderProducts(category) {
        productGrid.innerHTML = '';
        let filteredProducts = products;
        if (category !== 'all') {
            filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        if (filteredProducts.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            
            filteredProducts.forEach(product => {
                const img1 = product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400x500?text=Ingresa+Imagen';
                const img2 = product.images && product.images.length > 1 ? product.images[1] : img1; 

                const card = document.createElement('div');
                card.className = 'product-card img-hover-card';
                card.innerHTML = `
                    <div class="img-container">
                        <div class="product-img-wrapper" style="position: relative; padding-bottom: 125%;">
                            <img src="${img1}" alt="${product.name}" class="product-img primary" loading="lazy" style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover;">
                            ${img2 !== img1 ? `<img src="${img2}" alt="${product.name} Hover" class="product-img secondary-img" loading="lazy" style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover;">` : ''}
                        </div>
                        <button class="add-to-cart-action" data-id="${product.id}" style="z-index: 2; position: relative;">Seleccionar opciones</button>
                    </div>
                    <div class="product-info">
                        <div>
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-category">${product.category}</p>
                        </div>
                        <span class="product-price">${product.price}</span>
                    </div>
                `;
                
                card.addEventListener('click', () => openProductModal(product));
                
                const addBtn = card.querySelector('.add-to-cart-action');
                addBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openProductModal(product);
                });

                productGrid.appendChild(card);
            });
        }
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts(e.target.dataset.category);
        });
    });

    // ======== CART LOGIC ========
    function addToCart(product, optionsText, finalPrice) {
        const cartKey = product.id + (optionsText ? '|' + optionsText : '');
        const existingItem = cart.find(item => item.cartKey === cartKey);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ cartKey, product, quantity: 1, optionsText, finalPrice });
        }
        
        updateCartUI();
        showToast(`✔ Agregado: ${product.name}`);
    }

    function removeFromCart(cartKey) {
        cart = cart.filter(item => item.cartKey !== cartKey);
        updateCartUI();
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="color:#666; text-align:center; margin-top:2rem;">El carrito está vacío.</p>';
            checkoutProcessBtn.disabled = true;
        } else {
            checkoutProcessBtn.disabled = false;
            cart.forEach(item => {
                const itemPrice = item.finalPrice !== undefined ? item.finalPrice : parsePrice(item.product.price);
                total += itemPrice * item.quantity;
                count += item.quantity;

                const priceNum = itemPrice * item.quantity;
                const imgSource = item.product.images && item.product.images.length > 0 ? item.product.images[0] : 'https://via.placeholder.com/80x100?text=NoImg';

                const iDiv = document.createElement('div');
                iDiv.className = 'cart-item';
                iDiv.innerHTML = `
                    <img src="${imgSource}" class="cart-item-img" alt="Item">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.product.name} (x${item.quantity})</div>
                        ${item.optionsText ? `<div style="font-size: 0.75rem; color: #888; margin-bottom: 4px;">${item.optionsText}</div>` : ''}
                        <div class="cart-item-price">${formatPrice(priceNum)}</div>
                        <button class="remove-item-btn" data-key="${item.cartKey}">Remover</button>
                    </div>
                `;
                
                iDiv.querySelector('.remove-item-btn').addEventListener('click', () => {
                    removeFromCart(item.cartKey);
                });

                cartItemsContainer.appendChild(iDiv);
            });
        }

        subtotalCents = total;
        cartCountEl.innerText = count;
        cartTotalPriceEl.innerText = formatPrice(total);
        if (checkoutModal.classList.contains('show')) updateCheckoutMath();
    }

    function updateCheckoutMath() {
        const config = window.STORE_CONFIG || { COSTO_ENVIO_LIMA: 15, COSTO_ENVIO_PROVINCIA: 18 };
        const region = document.getElementById('checkout-region').value;
        
        document.getElementById('pay-subtotal-amount').innerText = formatPrice(subtotalCents);
        
        selectedShippingCost = 0;
        if (region) {
            if (region === 'Lima (Distritos)' || region === 'Callao') {
                selectedShippingCost = config.COSTO_ENVIO_LIMA || 15;
            } else {
                selectedShippingCost = config.COSTO_ENVIO_PROVINCIA || 18;
            }
        }
        
        const discRow = document.getElementById('discount-row');
        if (isFreeShippingActive && selectedShippingCost > 0) {
            document.getElementById('pay-discount-amount').innerText = `- ${formatPrice(selectedShippingCost)}`;
            document.getElementById('pay-shipping-amount').innerHTML = `<del>${formatPrice(selectedShippingCost)}</del>`;
            discRow.classList.remove('hidden');
        } else {
            document.getElementById('pay-shipping-amount').innerText = formatPrice(selectedShippingCost);
            discRow.classList.add('hidden');
        }
        
        const finalShipping = isFreeShippingActive ? 0 : selectedShippingCost;
        const grandTotal = subtotalCents + finalShipping;
        document.getElementById('pay-total-amount').innerText = formatPrice(grandTotal);
    }

    function toggleCart(show) {
        if (show) {
            cartSidebar.classList.add('open');
            sidebarOverlay.classList.add('show');
        } else {
            cartSidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
        }
    }

    cartTglBtn.addEventListener('click', () => toggleCart(true));
    closeCartBtn.addEventListener('click', () => toggleCart(false));
    sidebarOverlay.addEventListener('click', () => toggleCart(false));

    // ======== CHECKOUT MOCK ========
    Object.keys(PERU_LOCATIONS).sort().forEach(region => {
        const opt = document.createElement('option');
        opt.value = region;
        opt.innerText = region;
        regionSelect.appendChild(opt);
    });

    regionSelect.addEventListener('change', (e) => {
        const region = e.target.value;
        distritoSelect.innerHTML = '<option value="" disabled selected>Distrito / Provincia</option>';
        if (region && PERU_LOCATIONS[region]) {
            distritoSelect.disabled = false;
            PERU_LOCATIONS[region].sort().forEach(distrito => {
                const opt = document.createElement('option');
                opt.value = distrito;
                opt.innerText = distrito;
                distritoSelect.appendChild(opt);
            });
        }
        updateCheckoutMath();
    });

    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const userCode = document.getElementById('chk-cupon').value.trim().toUpperCase();
            const config = window.STORE_CONFIG || {};
            if (config.CUPON_ENVIO_GRATIS && userCode === config.CUPON_ENVIO_GRATIS.toUpperCase()) {
                isFreeShippingActive = true;
                showToast("🎁 Cupón aplicado: ¡Envío Gratis!");
                applyCouponBtn.innerText = "Aplicado ✓";
                applyCouponBtn.style.background = "#28a745";
                updateCheckoutMath();
            } else {
                isFreeShippingActive = false;
                showToast("❌ Cupón inválido.");
                applyCouponBtn.innerText = "Aplicar";
                applyCouponBtn.style.background = "#111";
                updateCheckoutMath();
            }
        });
    }

    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let val = this.value.replace(/\D/g, '');
            if (val.length >= 3) {
                val = val.substring(0, 2) + '/' + val.substring(2, 4);
            }
            this.value = val;
        });
    }

    let mapInstance;
    let mapMarker;

    checkoutProcessBtn.addEventListener('click', () => {
        toggleCart(false);
        updateCheckoutMath();
        checkoutModal.classList.add('show');
        
        // Setup Map safely within window timeout to ensure DOM sizing
        setTimeout(() => {
            if (!mapInstance) {
                mapInstance = L.map('checkout-map').setView([-12.0464, -77.0428], 12); // Default Lima Center
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                }).addTo(mapInstance);

                mapMarker = L.marker([-12.0464, -77.0428], {draggable: true}).addTo(mapInstance);
                
                function reverseGeocode(lat, lng) {
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                        .then(res => res.json())
                        .then(data => {
                            if(data && data.display_name) {
                                document.getElementById('chk-direccion').value = data.display_name;
                            }
                        })
                        .catch(err => console.log('Geocoding err', err));
                }

                mapMarker.on('dragend', function (e) {
                    const position = mapMarker.getLatLng();
                    deliveryMapCoordinates = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;
                    reverseGeocode(position.lat, position.lng);
                });

                mapInstance.on('click', function(e) {
                    mapMarker.setLatLng(e.latlng);
                    deliveryMapCoordinates = `https://www.google.com/maps/search/?api=1&query=${e.latlng.lat},${e.latlng.lng}`;
                    reverseGeocode(e.latlng.lat, e.latlng.lng);
                });
            } else {
                mapInstance.invalidateSize();
            }
        }, 300);
    });

    checkoutCloseBtn.addEventListener('click', () => checkoutModal.classList.remove('show'));

    const payMethodTarjeta = document.getElementById('pay-method-tarjeta');
    const payMethodContraentrega = document.getElementById('pay-method-contraentrega');
    const paymentBoxTarjeta = document.getElementById('payment-box-tarjeta');
    
    function togglePaymentBox() {
        if (payMethodTarjeta.checked) {
            paymentBoxTarjeta.style.display = 'block';
            paymentBoxTarjeta.querySelectorAll('input').forEach(i => i.required = true);
        } else {
            paymentBoxTarjeta.style.display = 'none';
            paymentBoxTarjeta.querySelectorAll('input').forEach(i => { i.required = false; i.value = ''; });
        }
    }

    if(payMethodTarjeta) payMethodTarjeta.addEventListener('change', togglePaymentBox);
    if(payMethodContraentrega) payMethodContraentrega.addEventListener('change', togglePaymentBox);

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }

        paySubmitBtn.innerText = "Procesando...";
        
        const formData = {
            nombre: document.getElementById('chk-nombre').value,
            apellido: document.getElementById('chk-apellido').value,
            dni: document.getElementById('chk-dni').value,
            correo: document.getElementById('chk-correo').value,
            telefono: document.getElementById('chk-telefono').value,
            region: document.getElementById('checkout-region').value,
            distrito: document.getElementById('checkout-distrito').value,
            direccionGoogleMapCoordenadas: deliveryMapCoordinates || "Ubicación en mapa no proporcionada por el cliente",
            direccionEscrita: document.getElementById('chk-direccion').value,
            referencia: document.getElementById('chk-referencia').value,
            metodoPago: payMethodContraentrega.checked ? 'Contraentrega' : 'Tarjeta',
            subtotalCesta: formatPrice(subtotalCents),
            costoEnvio: isFreeShippingActive ? "GRATIS (Cupón)" : formatPrice(selectedShippingCost),
            totalPagar: document.getElementById('pay-total-amount').innerText,
            pedido: cart.map(item => `${item.quantity}x ${item.product.name} (${item.optionsText || 'N/A'})`).join('\n')
        };

        const formspreeEndpoint = 'https://formspree.io/f/xbdwkzod';
        
        fetch(formspreeEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(res => {
            if (!res.ok) throw new Error("Network Response Error");
            checkoutModal.classList.remove('show');
            showToast("🎉 ¡Pedido realizado con éxito! Llegó a tu correo.");
            checkoutForm.reset();
            cart = [];
            paySubmitBtn.innerText = "Terminar y Pagar";
            updateCartUI();
        }).catch(err => {
            checkoutModal.classList.remove('show');
            showToast("🎉 ¡Pedido exitoso! (Modo Prueba: Configura Formspree para recibir correos).");
            checkoutForm.reset();
            cart = [];
            paySubmitBtn.innerText = "Terminar y Pagar";
            updateCartUI();
        });
    });

    // ======== PRODUCT MODAL & VARIANTS ========
    function openProductModal(product) {
        const images = product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/400x500?text=Ingresa+Imagen'];
        let thumbnailsHtml = '';
        images.forEach((img, idx) => {
            thumbnailsHtml += `<img src="${img}" class="thumbnail-img ${idx===0 ? 'active' : ''}" data-idx="${idx}">`;
        });

        // Generate Options Form
        let optionsHtml = '';
        const cat = product.category.toLowerCase();
        
        if (cat === 'bolsos') {
            optionsHtml = `
                <div class="product-options-form">
                    <div class="opt-group">
                        <label>Tamaño y Medidas</label>
                        <select id="modal-opt-1">
                            <option value="Pequeño (20x15x5 cm)">Pequeño (20x15x5 cm)</option>
                            <option value="Mediano (30x20x10 cm)">Mediano (30x20x10 cm)</option>
                            <option value="Grande (40x30x15 cm)">Grande (40x30x15 cm)</option>
                        </select>
                    </div>
                </div>
            `;
        } else if (cat === 'camisas') {
            optionsHtml = `
                <div class="product-options-form">
                    <div class="opt-group">
                        <label>Talla</label>
                        <select id="modal-opt-1">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>
                </div>
            `;
        } else if (cat === 'polos') {
            optionsHtml = `
                <div class="product-options-form">
                    <div class="opt-group">
                        <label>Talla</label>
                        <select id="modal-opt-1">
                            <option value="16">16</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                        </select>
                    </div>
                </div>
            `;
        } else if (cat === 'cuadernos') {
            optionsHtml = `
                <div class="product-options-form">
                    <div class="opt-group">
                        <label>Tipo de Hoja</label>
                        <select id="modal-opt-1">
                            <option value="Rayado">Rayado</option>
                            <option value="Cuadriculado">Cuadriculado</option>
                        </select>
                    </div>
                    <div class="opt-group">
                        <label>Cantidad de Hojas</label>
                        <select id="modal-opt-2">
                            <option value="100 hojas">100 hojas</option>
                            <option value="200 hojas">200 hojas</option>
                            <option value="300 hojas">300 hojas</option>
                        </select>
                    </div>
                </div>
            `;
        } else if (cat === 'tazas') {
             // No options needed for tazas
            optionsHtml = '';
        }

        const UNIQUE_DESCS = {
            "KENE STYLE BAG": "Este bolso urbano encarna el equilibrio perfecto entre practicidad moderna y la cosmovisión expansiva del pueblo Shipibo-Konibo. Su patrón Kene Style atrae las energías protectoras mientras recorres la ciudad.",
            "RAICES EN TELAS": "Una pieza tejida con resistencia y memoria. Raíces en Telas exhibe un estampado central que sirve como escudo de purificación y conexión profunda con los orígenes amazónicos.",
            "ESPIRITU DE LA SELVA": "Prenda ceremonial adaptada a la vida moderna. Sus líneas inmaculadas representan los ríos sagrados de la Amazonía, envolviendo al portador con el verdadero Espíritu de la Selva.",
            "KENE NOTES": "Diseñado para resguardar las ideas más brillantes. Los trazos en la portada fluyen libremente como laberintos de creatividad, inspirados en los místicos y antiguos cantos de sanación.",
            "MEMORIA KENE": "Transforma el acto de escribir en un hermoso ritual. Cada hoja se encuentra custodiada por un diseño ancestral que ha perdurado por siglos en las visiones cósmicas de las maestras artesanas.",
            "TRAZOS ANCESTRALES": "Fuente de inspiración inagotable. Los Trazos Ancestrales invocan la inteligencia antigua para dar claridad a los pensamientos, canalizando energías celestiales en la cubierta.",
            "ALMA AMAZONICA": "Este polo sólido porta en su centro un grabado poderoso. El exclusivo diseño rinde tributo material directo a las constelaciones chamánicas y el inmenso respeto por nuestra sagrada floresta.",
            "AMAZON PURE": "Elaborado con pureza en la mente. Su estética eleva radicalmente la simetría Shipibo-Konibo, convirtiendo a este textil en una extensión viva de la imponente armonía de la naturaleza.",
            "AMAZON STYLE": "Vanguardia, comodidad y profundo legado. El diseño expansivo demuestra de qué forma los trayectos milenarios del Kené se pueden amoldar visualmente a las tendencias estéticas globales temporales.",
            "KENE ANSESTRAL": "Lleva con soberanía nuestra selva en tu piel. Destaca trazos curativos orgánicos sobre tonalidad oscura sólida para funcionar como una trama invisible de resistencia silvestre y un inmenso refugio anímico.",
            "KENE BLACK EDITION": "Asombrosa y sofisticada indumentaria oscura donde la luz fluye velozmente de modo exclusivo emanando de trazos entrelazados impecablemente. Auténtico misticismo amazónico moderno.",
            "KENÉ URBANO": "Alineándonos integral y directamente con el latido cosmopolita. La vestimenta Kené irradia de sí constante equilibrio sensorial ante los caóticos senderos actuales manteniendo el fuego y protección oriundos.",
            "WHITE KENE EDITION": "Refleja plenitud infinita. Indumentaria blanca atenuando en su frontal un trazado majestuoso que no deja apartar tus ojos de ella como si fuese tu propio foco de pureza material e inmaculada convicción real.",
            "KENE CUP": "Haz vibrar interiormente cada jornada con enorme poder térmico. Aquellas imborrables y finamente impresas pinceladas abstractas purificarán los elementos brindando vital curación matutina infinita."
        };

        let inspirationText = UNIQUE_DESCS[product.name] || 'Línea curada artesanalmente e inspirada en gran detalle con las fascinantes vertientes misteriosas amazónicas de la etnia local Shipibo-Konibo preservando tradición en todo centímetro.';

        productModalBody.innerHTML = `
            <div class="product-modal-gallery">
                <img src="${images[0]}" class="main-img-view" id="modal-main-img">
                <div class="thumbnail-list">
                    ${thumbnailsHtml}
                </div>
            </div>
            <div class="product-modal-info">
                <h2 class="product-modal-title">${product.name}</h2>
                <div class="product-modal-cat">${product.category}</div>
                <div class="product-modal-price" id="modal-price-display">${product.price}</div>
                ${optionsHtml}
                <div style="margin-top: 0.5rem; margin-bottom: 1.5rem; padding: 1rem; border-left: 4px solid #111; background-color: #fafafa; font-family: 'Times New Roman', Times, serif; font-style: italic; color: #111; font-size: 1.15rem; line-height: 1.4; font-weight: 500;">
                    "${inspirationText}"
                </div>
                <button class="modal-add-btn" id="modal-add-btn">Añadir al carrito</button>
            </div>
        `;

        const mainImgView = document.getElementById('modal-main-img');
        const thumbs = productModalBody.querySelectorAll('.thumbnail-img');
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                thumbs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                mainImgView.src = images[e.target.dataset.idx];
            });
        });

        let finalPriceObj = parsePrice(product.price);

        if (cat === 'polos') {
            const selectOpt = document.getElementById('modal-opt-1');
            const updatePoloPrice = () => {
                if (selectOpt.value === '16' || selectOpt.value === 'S') {
                    finalPriceObj = 40;
                } else {
                    finalPriceObj = 45;
                }
                document.getElementById('modal-price-display').innerText = formatPrice(finalPriceObj);
            };
            selectOpt.addEventListener('change', updatePoloPrice);
            updatePoloPrice(); // trigger initial display logic
        }

        document.getElementById('modal-add-btn').addEventListener('click', () => {
            let optionsText = '';
            const opt1 = document.getElementById('modal-opt-1');
            const opt2 = document.getElementById('modal-opt-2');
            
            if (opt1) optionsText += opt1.value;
            if (opt2) optionsText += ' | ' + opt2.value;
            
            addToCart(product, optionsText, finalPriceObj);
            productModal.classList.remove('show');
            toggleCart(true);
        });

        productModal.classList.add('show');
    }

    productModalClose.addEventListener('click', () => productModal.classList.remove('show'));

    window.addEventListener('click', (e) => {
        if(e.target === checkoutModal) checkoutModal.classList.remove('show');
        if(e.target === productModal) productModal.classList.remove('show');
    });

    // Boot
    renderProducts('all');
    updateCartUI();
});
