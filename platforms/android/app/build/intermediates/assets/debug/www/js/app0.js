var Application = {
	initApplication : function(){
		$(document).load('pageinit', '#page-one', function(){
				Application.initShowNews();
		});
		$(document).on('click', '#detail-news', function(){
			var id = $(this).data('idnews');
			Application.initShowDetailNews(id);
		});
	},

	initShowNews : function(){
			$.ajax({
				url:'http://filkom.ub.ac.id/page/news_json',
				type:'get',
				crossDomain: true,
    				cache: false,
				dataType: "json",
				beforeSend : function(){
					$.mobile.loading('show',{
						text:'Tunggu sebentar, sedang memuat data...',
						textVisible:true
					});
				},
				success : function(data){
					$.each(data, function(key,dataObject) {
						var appendList = '<li class="ui-first-child ui-last-child"><a href="index.html#page-two?id='+dataObject.id+'" target="_self" id="detail-news" data-idnews="'+dataObject.id+'" class="ui-btn ui-btn-icon-right ui-icon-carat-r"><h2>'+dataObject.judul+'</h2><p>'+dataObject.isi+'</p><p><b>'+dataObject.tgl+'</b></p></a></li>';
						$('#list-news').append(appendList);
					});
				},
				complete :function(){
					$.mobile.loading('hide');
				}
		});
	},

	initShowDetailNews : function(id){
		$.ajax({
			url:'http://filkom.ub.ac.id/page/news_json',
			type:'get',
			crossDomain: true,
    			cache: false,
			dataType: "json",
			beforeSend : function(){
				$.mobile.loading('show',{
					text:'Tunggu sebentar, sedang memuat data...',
					textVisible:true
				});
			},
			success : function(data){
				$.each(data, function(key,dataObject) {
					if(dataObject.id == id){
						$("#judulBerita").text(dataObject.judul);
						$("#tgl").text(dataObject.tgl);
						$("#jam").text(dataObject.jam);
						$("#gambarBerita").attr("src",dataObject.img);
						$("#isiBerita").text(dataObject.isi);
						$("#lengkap").text("baca selengkapnya : ");
						$("#lengkap").append('<a href="'+dataObject.url_web+'">'+dataObject.url_web+'</a>');
					}
				});
			},
			complete :function(){
				$.mobile.loading('hide');
			}
		});
	}
}
