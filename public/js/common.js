/**
 * Created by JerryC on 2014/8/24.
 */


/* responsive for the body size */
/*function resizeBody(){
    var pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;

    if(typeof pageWidth != "number"){
        if(document.compatMode == "CSS1Compat"){
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        }else{
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }

    $('body').css({
        'min-height':pageHeight,
        'min-width':pageWidth
    });
}
$(function(){
    $(window).resize(function(){
       resizeBody();
    });
    resizeBody();
});*/


/* Arc of navigation */
$(function(){
    var nav_arc=document.querySelector("#nav_arc");
        ul=nav_arc.querySelector("ul"),
        lis=ul.querySelectorAll("li"),
        i=lis.length,
        n=i-1,
        r=200,
        transform=function(x){
            this.style.transform=this.style.webkitTransform=this.style.mozTransform=this.style.oTransform=this.style.msTransform=x;
        };

    while(i--)
    {
        lis[i].data_transform="translate("+(-r*Math.cos(90/n*i*(Math.PI/180)))+"px,"+(-r*Math.sin(90/n*i*(Math.PI/180)))+"px)";
        lis[i].style.transitionDelay=lis[i].style.webkitTransitionDelay=lis[i].style.mozTransitionDelay=lis[i].style.msTransitionDelay=lis[i].style.oTransitionDelay=(i*50)+"ms";
    }

    ul.addEventListener("click",function(){
        console.log('the ul has clicked');
        this.classList.toggle("active");
        var i=lis.length;

        if(this.classList.contains("active"))
            while(i--){transform.call(lis[i],lis[i].data_transform)}

        else
            while(i--){transform.call(lis[i],"")}
    },false);
});


/* Mask Plugin */
(function($){
    var $mask = $('<div id="mask"></div>');
    $mask.css({
        'position':'fixed',
        'background-color':'black',
        'opacity':'0.6',
        'height':'100%',
        'width':'100%',
        'top':'0px',
        'left':'0px',
        'z-index':'110'
    });

    $.fn.extend({
        "mask":function(value,articleId){
            $this = this;
            switch (value){
                case 'open':
                    $this.css({
                        'display':'block',
                        'z-index':'120',
                        'top':'100%',
                        'opacity':'0'
                    });
                    console.log(this);
                    $('body').append($mask);
                    $this.animate({
                        'top':'0px',
                        'opacity':'1'
                    });
                    break;
                case 'close':
                    $this.animate({
                        'top':'100%',
                        'opacity':'0'
                    },function(){
                        $this.css('display','none');
                    });
                    $('#mask').remove();
                    break;
                case 'loadData':
                    break;
                default :
                    break;
            }
            return $this;
        }
    });
})(jQuery);
$(function(){
   $('.articleItem').click(function(){
        $('#article').mask('open');
   });
});


$(function(){
   /* var me = $('.arc_me');
    var notes = $('.arc_notes');
    me.css({
        top:-100
    });

    //alert(me.show());*/
});