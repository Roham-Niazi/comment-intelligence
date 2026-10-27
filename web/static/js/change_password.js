function send_data() {
	const last_password = String(document.getElementById("password_input_1").value || "").trim();
	const new_password_1 = String(document.getElementById("password_input_2").value || "").trim();
	const new_password_2 = String(document.getElementById("password_input_3").value || "").trim();

	if (!last_password || !new_password_1 || !new_password_2) {
        Notiflix.Notify.warning(
            "لطفا فیلدها را پر کنید",

            {
                rtl:true,
                fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif',
                zindex: 999999,
                position: "right-bottom"
            }
        );
        return;
    }

	if (new_password_1!==new_password_2){
		Notiflix.Notify.warning(
            "رمزعبور جدید با تکرار رمزعبور جدید یکسان نیست",

            {
                rtl:true,
                fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif',
                zindex: 999999,
                position: "right-bottom"
            }
        );
        return;
	}

	if (new_password_1===last_password){
		Notiflix.Notify.warning(
            "رمزعبور فعلی با رمزعبور جدید یکسان است",

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
		data:{
			last_password: last_password,
			new_password: new_password_1,
		},
		headers: {
            "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value
        },
        dataType: "json",

		success: function(data){
			if (data["success"]){
				Notiflix.Notify.success("رمزعبور با موفقیت تغییر یافت", {rtl:true, position:"right-bottom", fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif'})
				document.getElementById('password_input_1').value=""
				document.getElementById('password_input_2').value=""
				document.getElementById('password_input_3').value=""
			}else{
				Notiflix.Notify.failure(data["msg"], {rtl:true, position:"right-bottom", fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif'})
			}
		},

		complete: function(){
			Notiflix.Block.remove("#main_card")
		}
	})
}