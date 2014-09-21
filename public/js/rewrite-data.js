/**
 * Created by JerryC on 2014/9/21.
 */

(function(){
    window.rewriteData = {};
    window.rewriteData.init = function(filename,dir){
        console.log('dir is :'+dir);
        window[filename].posts = window[filename];
        window[filename].numPages = Math.ceil(window[filename].length / 10);
        window[filename].currentPage = 1;

        $('.blog_addMore').click(function(){
            var node = $(this);
            node.find('a').hide();
            node.find('span').show();
            setTimeout(function(){
                rewriteData.loadData(window[filename],window[filename].currentPage+1,dir);
                node.find('a').show();
                node.find('span').hide();
            },800);
        });
    };
    window.rewriteData.loadData = function (object,page,dir){
        if(object.currentPage == object.numPages) return alert('已经到底啦！');
        var list = $('.articleList');
        var itemTemplate = '<div class="articleItem" data-entityId="">'+
                                '<div class="articleItem_label">'+
                                    '<div class="articleItem_label_date"></div>'+
                                    '<div class="articleItem_label_monthYear"></div>'+
                                '</div>'+
                                '<div class="articleItem_title"></div>'+
                                '<div class="articleItem_content"></div>'+
                            '</div>';
        for(var i = object.currentPage*10 ; i < 10*page ; i++){
            if(!object.posts[i]) break;
            var id = object.posts[i]._id;
            var dateArray = object.posts[i].createTime.day.toString().split('-');
            var title = object.posts[i].title;
            var brief = object.posts[i].brief;
            var item = $(itemTemplate);
            item.attr('data-entityId',id);
            item.find('.articleItem_label_date').html(dateArray[2]);
            item.find('.articleItem_label_monthYear').html(dateArray[1]+'/'+dateArray[0]);
            item.find('.articleItem_title').html(title);
            item.find('.articleItem_content').html(brief);
            item.click(function(){
                var iframe = $('#article iframe');
                var articleItem = $(this);
                if(iframe && articleItem){
                    var entityId = articleItem.attr('data-entityId');
                    console.log(dir+'/'+entityId+'.html');
                    iframe.attr('src',dir+'/'+entityId+'.html');
                }
                $('#article').mask('open');
            });
            item.appendTo(list);
        }
        object.currentPage++;
    };
}());