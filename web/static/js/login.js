function send_data(){
    const phone = String(document.getElementById("phone_input").value || "").trim();
    const password = String(document.getElementById("password_input").value || "").trim();

    if (!phone || !password) {
        Notiflix.Notify.warning(
            "لطفا شماره تلفن و رمزعبور را وارد کنید",

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
            password: password,
        },
        headers: {
            "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value
        },
        dataType: "json",

        success: function(data){

            if (data["success"]){
                window.location=nextUrl || dashboardUrl
            }else {
                Notiflix.Notify.failure("نام کاربری یا رمزعبور اشتباه است", {rtl:true, position:"right-bottom", fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif'})
            }
        },

        complete: function(){
            Notiflix.Block.remove("#main_card")
        }
    })
}