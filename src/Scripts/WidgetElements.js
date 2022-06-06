var Domain = "https://demo.nmviajes.com";
(function (global) {
    var ArrayIds = [];
    if (data.HeaderId != undefined) {
        if (data.HeaderId != null && data.HeaderId != "") {
            ArrayIds.push(data.HeaderId);
        }
    }
    if (data.FooterID != undefined) {
        if (data.FooterID != null && data.FooterID != "") {
            ArrayIds.push(data.FooterID);
        }
    }

    var processedScripts = [];
    var styleTags = [];
    var scriptTags = document.getElementsByTagName('script');
    var thisRequestUrl = Domain + '/Scripts/WidgetElements.js';
    for (var i = 0; i < scriptTags.length; i++) {
        var scriptTag = scriptTags[i];
        if (scriptTag.src == thisRequestUrl && processedScripts.indexOf(scriptTag) < 0) {
            processedScripts.push(scriptTag);
            if (styleTags.length == 0) {
                var styleTag = document.createElement("link");
                styleTag.rel = "stylesheet";
                styleTag.type = "text/css";
                styleTag.href = Domain + "/Content/css/template.css"; //
                styleTag.media = "all";
                document.getElementsByTagName('head')[0].appendChild(styleTag);
                styleTags.push(styleTag);

                // var styleTag2 = document.createElement("link");
                // styleTag2.rel = "stylesheet";
                // styleTag2.type = "text/css";
                // styleTag2.href = Domain+ "/Content/css/global-2.0.css?cod=66466";
                // styleTag2.media = "all";
                // document.getElementsByTagName('head')[0].appendChild(styleTag2);
                // styleTags.push(styleTag2);

                var styleTag3 = document.createElement("link");
                styleTag3.rel = "stylesheet";
                styleTag3.type = "text/css";
                styleTag3.href = Domain + "/Content/css/head-footv3/layout.css?cod=6466";
                styleTag3.media = "all";
                document.getElementsByTagName('head')[0].appendChild(styleTag3);
                styleTags.push(styleTag3);

            }
            getContent(ArrayIds);
        }
    }
})(this);


function getContent(ArrayIds) {
    for (var i = 0; i < ArrayIds.length; i++) {
        var _getmatrix = Domain + "/Widgets/" + ArrayIds[i];
        $.ajax({
            cache: false,
            url: _getmatrix,
            type: "POST",
            async: false,
            dataType: "html",
            success: function (obj) {
                if (typeof obj.error !== "undefined") {
                    alert("Error!!");
                } else {
                    $("#" + ArrayIds[i]).replaceWith(obj);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }

}

$(document).ready(function () {
    //Variables
    var icon_hamburger = $('.hamburger-icon');
    var header = $('.header');

    //Events	
    if (icon_hamburger.length > 0) {
        icon_hamburger.on('click', function () {
            header.toggleClass('active');
        });
    }

    $('.alert-promotion .icon-close').on('click', function () {
        $(".alert-promotion").animate({ height: 0, opacity: 0 }, 300);

        let wraPadTop = parseInt($('.wrapper').css('padding-top')) - 37;

        $('.wrapper').animate({ paddingTop: wraPadTop }, 300);
    });


});