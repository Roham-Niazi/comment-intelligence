Chart.defaults.font.family="IRANSansXFaNum-Regular, Arial, Helvetica, sans-serif"

const ctx1=document.getElementById('recommendation_chart');
ctx1.width=16;
ctx1.height=5;

const ctx2=document.getElementById('offensivity_chart');
ctx2.width=16;
ctx2.height=5;


chart1=new Chart(ctx1, {
	type: 'line',
	data: {},
	options: {
		responsive: true,
		maintainAspectRatio: false,

		plugins: {
			legend: {
				position: 'top',
			},
		},
		scales: {
			y: {min: 0}
		}
	},
})


chart2=new Chart(ctx2, {
	type: 'line',
	data: {},
	options: {
		responsive: true,
		maintainAspectRatio: false,

		plugins: {
			legend: {
				position: 'top',
			},
		},
		scales: {
			y: {min: 0}
		}
	},
})



function update_chart(tag){
	Notiflix.Block.dots("#chart_card")

	$.ajax({
		type:"post",
		url: "",
		data: { tag: tag },
		headers: {
			"X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value
		},
		dataType: "json",

		success: function(res){
			console.log(res)
			chart1.data={
				labels: res["labels"],
				datasets: [
					{
						label: "حس مثبت",
						data: res["data"]["recommended"],
						borderColor: "rgb(25, 135, 84)",
						backgroundColor: "rgba(25, 135, 84, 0.5)",
						fill: true,
						tension: 0.1,
					},
					{
						label: "حس منفی",
						data: res["data"]["not_recommended"],
						borderColor: "rgb(220, 53, 69)",
						backgroundColor: "rgba(220, 53, 69, 0.5)",
						fill: true,
						tension: 0.1,
					}
				]
			}
			chart1.update()


			chart2.data={
				labels: res["labels"],
				datasets: [
					{
						label: "غیر توهین آمیز",
						data: res["data"]["not_offensive"],
						borderColor: "rgb(25, 135, 84)",
						backgroundColor: "rgba(25, 135, 84, 0.5)",
						fill: true,
						tension: 0.1,
					},
					{
						label: "توهین آمیز",
						data: res["data"]["offensive"],
						borderColor: "rgb(220, 53, 69)",
						backgroundColor: "rgba(220, 53, 69, 0.5)",
						fill: true,
						tension: 0.1,
					}
				]
			}
			chart2.update()
		},

		complete: function(){
			Notiflix.Block.remove("#chart_card")
		}
	})
}


window.addEventListener("load", (event) => {
	update_chart("")
});