function send_data(){
    const text = String(document.getElementById("text_input").value || "").trim();

    if (!text) {
        Notiflix.Notify.warning(
            "لطفا ابتدا متن را وارد کنید",

            {
                rtl:true,
                fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif',
                zindex: 999999,
                position: "right-bottom"
            }
        );
        Notiflix.Block.remove("#demo_card");
        return;
    }

    Notiflix.Block.dots("#demo_card")

    $.ajax({
        type:"post",
        url: "",
        data: { text: text },
        headers: {
            "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value
        },
        dataType: "json",


        success: function(data){
            const recommended=data["recommendation_percent"]>=0.5
            const offensivity=data["offensivity_percent"]>=0.5
            if (recommended){
                recommendation_badge='<span class="badge text-bg-success">حس مثبت</span>';
            }else{
                recommendation_badge='<span class="badge text-bg-danger">حس منفی</span>';
            }

            if (offensivity){
                offensivity_badge='<span class="badge text-bg-danger">توهین آمیز</span>';
            }else{
                offensivity_badge='<span class="badge text-bg-success">غیر توهین آمیز</span>';
            }
            recommendation_percent=Math.round(data["recommendation_percent"]*100)
            offensivity_percent=Math.round(data["offensivity_percent"]*100)

            body=`<table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">درصد</th>
                            <th scope="col">وضعیت</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr>
                            <th scope="row">توهین آمیز بودن</th>
                            <td>`+offensivity_percent+`%</td>
                            <td>`+offensivity_badge+`</td>
                        </tr>
                        <tr>
                            <th scope="row">مثبت بودن حس</th>
                            <td>`+recommendation_percent+`%</td>
                            <td>`+recommendation_badge+`</td>
                        </tr>
                    </tbody>
                </table>`
            
            Notiflix.Report.info(
                'پیش&zwnj;بینی',
                body,
                'بستن',
                {rtl:true, fontFamily:'IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif', plainText:false, "messageMaxLength": 1000}
            );
        },

        complete: function(){
            Notiflix.Block.remove("#demo_card");
        }
    })
}