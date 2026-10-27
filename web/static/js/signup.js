function send_data(){
    const phone = String(document.getElementById("phone_input").value || "").trim();
    const password1 = String(document.getElementById("password_1_input").value || "").trim();
    const password2 = String(document.getElementById("password_2_input").value || "").trim();

    if (!phone || !password1 || !password2) {
        Notiflix.Notify.warning(
            "لطفا شماره تلفن و رمزعبورها را وارد کنید",

            {
                rtl:true,
                fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif',
                zindex: 999999,
                position: "right-bottom"
            }
        );
        return;
    }
    
    if (password1!==password2) {
        Notiflix.Notify.warning(
            "رمزعبور با تکرار رمزعبور یکسان نیست",

            {
                rtl:true,
                fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif',
                zindex: 999999,
                position: "right-bottom"
            }
        );
        return;
    }

    Notiflix.Block.dots("#main_card")

    $.ajax({
        type:"post",
        url: "",
        data: {
            phone: phone,
            password: password1,
        },
        headers: {
            "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value
        },
        dataType: "json",

        success: function(data){

            if (data["success"]){
                window.location=dashboardUrl
            }else{
                Notiflix.Notify.failure(data["msg"], {rtl:true, position:"right-bottom", fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif'})
            }
        },

        complete: function(){
            Notiflix.Block.remove("#main_card")
        }
    })
}