// 1. قاعدة البيانات الشاملة للمنتجات
const products = [
    // 🏗️ قسم الجملة والكميات
    { id: 1, name: "أسمنت أسمر العسكري", price: 3900, img: "/1772101763493.png", unit: "طن", type: "main", desc: "أقوى أنواع الأسمنت للخرسانة والأساسات الصعبة." },
    { id: 2, name: "أسمنت أبيض سوبر سيناء", price: 6600, img: "/1772108604470.png", unit: "طن", type: "main", desc: "بياض ناصع وقوة تحمل للواجهات والديكورات." },
    { id: 3, name: "جبس نجمة سيناء", price: 3000, img: "/1772102309114.png", unit: "طن", type: "main", desc: "جبس سريع التصلب وممتاز لأعمال المحارة." },
    { id: 4, name: "جبس المعمار", price: 2500, img: "/1772103413723.png", unit: "طن", type: "main", desc: "جبس اقتصادي عالي الجودة لجميع الأغراض." },
    { id: 5, name: "جير مطفي طرة", price: 2250, img: "/1772104038503.png", unit: "طن", type: "main", desc: "جير مطفي ممتاز لأعمال البناء التقليدية." },
    { id: 6, name: "حديد تسليح", price: 36000, img: "/1772098405611.png", unit: "طن", type: "main", desc: "حديد تسليح مطابق للمواصفات الهندسية لجميع المنشآت." },
    { id: 7, name: "حديد سلاسل", price: 40000, img: "/1772094259154.png", unit: "طن", type: "main", desc: "حديد سلاسل شديد المتانة للشدادات والمقاولات." },
    { id: 8, name: "طوب أبيض (أجري)", price: 2300, img: "/1772096544841.png", unit: "1000 طوبة", type: "main", desc: "طوب خفيف الوزن وعازل ممتاز للحرارة والصوت." },
    { id: 9, name: "طوب أحمر", price: 1600, img: "/1772096797178.png", unit: "1000 طوبة", type: "main", desc: "الطوب الأحمر الكلاسيكي للبناء المتين." },
    { id: 10, name: "زلط ثن", price: 400, img: "/1772110754920.png", unit: "متر", type: "main", desc: "زلط نظيف للخلطات الخرسانية." },

    // 🛍️ قسم التجزئة
    { id: 11, name: "شكارة أسمنت أسمر", price: 195, img: "/1772101763493.png", unit: "شكارة", type: "retail", desc: "شكارة أسمنت العسكري (تجزئة)." },
    { id: 12, name: "شكارة أسمنت أبيض", price: 265, img: "/1772108604470.png", unit: "شكارة", type: "retail", desc: "شكارة أسمنت أبيض سيناء (تجزئة)." },
    { id: 13, name: "شكارة جبس نجمة", price: 90, img: "/1772102309114.png", unit: "شكارة", type: "retail", desc: "شكارة جبس نجمة سيناء (تجزئة)." },
    { id: 14, name: "شكارة جبس معمار", price: 75, img: "/1772103413723.png", unit: "شكارة", type: "retail", desc: "شكارة جبس المعمار (تجزئة)." },
    { id: 15, name: "شكارة جير", price: 45, img: "/1772104038503.png", unit: "شكارة", type: "retail", desc: "شكارة جير طرة مطفي (تجزئة)." },
    { id: 16, name: "عتب (120سم)", price: 120, img: "/1772113643987.png", unit: "قطعة", type: "retail", desc: "عتب خرساني جاهز ومتين للأبواب والشبابيك." }
];

let cartList = [];

// 2. رسالة الريبوت
const msg1 = "أهلاً وسهلاً.. محلات الحاج سلمي لمواد البناء .يومكو سعيد";
const msg2 = "شد السلك بسرعة خلينا نفتح المحل!";
let charIdx = 0;

function typeWriter(text, callback) {
    if (charIdx < text.length) {
        document.getElementById("robot-message").innerHTML += text.charAt(charIdx);
        charIdx++; setTimeout(() => typeWriter(text, callback), 45);
    } else if (callback) { setTimeout(callback, 800); }
}

window.onload = () => {
    typeWriter(msg1, () => {
        document.getElementById("robot-message").innerHTML = ""; charIdx = 0;
        typeWriter(msg2, () => {
            document.getElementById("lamp-container").classList.remove("hidden");
        });
    });
    renderPage();
};

// 3. أنيميشن فتح الموقع
const cord = document.getElementById("main-cord");
cord.addEventListener("mouseup", () => {
    document.getElementById("bulb-element").classList.add("on");
    
    const tl = gsap.timeline();
    tl.to("#intro-overlay", { duration: 0.5, opacity: 0, display: "none" })
      .set("#main-content", { display: "block" })
      .to("#main-content", { duration: 0.5, opacity: 1 })
      .from(".item-card", { duration: 0.5, y: 30, opacity: 0, stagger: 0.1 });
});

// 4. عرض المنتجات
function renderPage() {
    products.forEach(p => {
        const cardHTML = `
            <div class="item-card" onclick="openFolder(${p.id})">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>السعر: <b>${p.price}</b> ج.م</p>
                <button class="buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})">أضف للسلة 🛒</button>
            </div>`;
        const target = p.type === "main" ? "main-grid" : "retail-grid";
        document.getElementById(target).innerHTML += cardHTML;
    });
}

// 5. الفولدر (التفاصيل)
function openFolder(id) {
    const p = products.find(i => i.id === id);
    document.getElementById("product-folder-content").innerHTML = `
        <img src="${p.img}" style="width:100%; height:180px; object-fit:contain; border-radius:10px; margin-bottom:5px;">
        <h2 style="margin: 5px 0;">${p.name}</h2>
        <p style="color:#555; font-size:15px; margin: 5px 0;">${p.desc}</p>
        <p style="font-size:22px; color:#4e54c8; margin: 10px 0;">السعر: <b>${p.price} ج.م</b> لكل ${p.unit}</p>
        <button class="buy-btn" style="padding:15px;" onclick="addToCart(${p.id}); document.getElementById('details-modal').classList.add('hidden');">أضف للطلبية الآن</button>
    `;
    document.getElementById("details-modal").classList.remove("hidden");
    gsap.from(".details-view", { duration: 0.3, scale: 0.8, opacity: 0, ease: "back" });
}

// 6. الإغلاق
document.getElementById("close-details-btn").onclick = () => document.getElementById("details-modal").classList.add("hidden");
document.getElementById("close-cart-btn").onclick = () => document.getElementById("cart-window").classList.add("hidden");

window.onclick = function(event) {
    const detailsModal = document.getElementById("details-modal");
    const cartModal = document.getElementById("cart-window");
    if (event.target === detailsModal) detailsModal.classList.add("hidden");
    if (event.target === cartModal) cartModal.classList.add("hidden");
}

// 7. السلة 
function addToCart(pid) {
    const p = products.find(i => i.id === pid);
    cartList.push(p);
    document.getElementById("cart-counter").innerText = cartList.length;
    alert(`تمت إضافة ${p.name} ✅`);
}

document.getElementById("cart-open-btn").onclick = () => {
    const list = document.getElementById("items-in-cart");
    list.innerHTML = ""; let sum = 0;
    cartList.forEach((it, idx) => {
        list.innerHTML += `<div class="cart-row"><img src="${it.img}"><div style="flex-grow:1; text-align:right;">${it.name}</div><div>${it.price} ج.م</div><button onclick="del(${idx})" style="color:red; background:none; border:none; cursor:pointer; font-size: 18px;">🗑️</button></div>`;
        sum += it.price;
    });
    document.getElementById("total-val").innerText = sum;
    document.getElementById("cart-window").classList.remove("hidden");
};

function del(i) {
    cartList.splice(i, 1);
    document.getElementById("cart-open-btn").click(); 
}

// 8. الإرسال الأوتوماتيك (تم إضافة الأكواد الخاصة بك هنا بنجاح!)

document.getElementById("order-submit").onclick = () => {
    const phone = document.getElementById("client-tel").value;
    if (phone.length < 11) { alert("اكتب رقم التليفون الأول عشان نعرف نتواصل معاك!"); return; }
    if (cartList.length === 0) { alert("السلة فاضية يا بطل!"); return; }

    // راجعت الأكواد من صورك وحطيتها هنا بالظبط
    emailjs.send('service_bjsrtef', 'template_nnqz0z4', {
        to_email: "podep8166@gmail.com",
        customer_phone: phone,
        order_details: cartList.map(it => it.name).join(", "),
        total_price: document.getElementById("total-val").innerText
    }, 'k_acnq7Q4z6nOl27U').then(() => {
        alert("✅ تم الحجز بنجاح والإشعار وصل للحاج سلمي أوتوماتيك!");
        cartList = []; 
        document.getElementById("cart-counter").innerText = "0";
        document.getElementById("cart-window").classList.add("hidden");
    }, (err) => { 
        alert("الخطأ الحقيقي من السيرفر هو: " + JSON.stringify(err)); 
    });

};
