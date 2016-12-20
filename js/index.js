/**
 * Created by wugy on 2016/12/19.
 */
$(function () {
    var Common =(function () {
        //��Ϣ��ʾ��type 1:��ȷ��Ϣ 0:������Ϣ��
        var showInfo = function (text, type) {
            $(".info-box").remove();
            if (type == 1) {
                $("body").append("<div class='info-box'><div class=success>" + text + "</div></div>");
            } else {
                $("body").append("<div class='info-box'><div class=error>" + text + "</div></div>");
            }
            setTimeout(function () {
                $(".info-box").animate({ "top": "50px", "opacity": 0 }, function () { $(".info-box").remove(); });
            }, 2000)
        };

        //��ʾ��ʾ
        var showTips = function (obj) {
            var v = $(obj);
            var _left = v.offset().left;
            var _top = v.offset().top;
            var _title = v.data('description');
            var tipsStr = '<span class="tips_arrow">��</span><div class="tips">' + _title + '</div>';
            $('body').append(tipsStr);
            $('.tips_arrow').css({ left: _left + 8, top: _top - 32 });
            $('.tips').css({ 'left': _left, top: _top - 40, 'margin-left': -($('.tips').width() / 2) + 7 });
        };

        //�Ƴ���ʾ
        var removeTips = function () {
            $('.tips_arrow').remove();
            $('.tips').remove();
        };

        //������
        var loading = function (text) {
            $('body').append('<div class="blackbg"></div><div id="loading"><img src="' + '/images/loading.gif" width="150">' + text + '</div>');
        };

        //�������
        var loaded = function () {
            $('.blackbg').animate({ 'opacity': '0' }, function () { $('.blackbg').remove(); });
            $('#loading').remove();
        };

        var fillZero = function (number, digits) {
            number = String(number);
            var length = number.length;
            if (number.length < digits) {
                for (var i = 0; i < digits - length; i++) {
                    number = "0" + number;
                }
            }
            return number;
        };
        var Common = {
            showInfo:showInfo,
            showTips:showTips,
            removeTips:removeTips,
            loading:loading,
            loaded:loaded,
            fillZero:fillZero
        };
        return Common;
    })();


    (function (Common) {
        //����ͼ��ʾ��С
        var setBackgroundSize = function () {
            var scale = $(window).width() / $(window).height();
            if (scale < 1.7777) {
                $('body').css('background-size', 'auto 100%');
            } else {
                $('body').css('background-size', '100% auto');
            }
        };
        //��ʼ��
        var init = function () {

            $(window).resize(function () {
                setBackgroundSize();
            });

            var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
            if (!isChrome) {
                $("body").prepend('<div id="nohtml5"><div>����������ʹ�÷�chrome�����,����Ļ�����鴦�ڲ���״̬,���������̸��������,�Ի�ø��õ��û����顣<br/>���������:<a href="http://www.chromeliulanqi.com/" target="blank"><img src=" ' + $('#config>#FileWebHost').val() + '/ScreenTheme/default/images/chrome.jpg"> chrome�����</a></div></div>');
            }
            //ģ��select
            $(".select").click(function (event) {
                event.stopPropagation();
                if (!$(this).parent().hasClass('disabled')) {
                    $(".select_option").slideUp();
                    if ($(this).next(".select_option").css("display") == "none") {
                        $(this).next(".select_option").css({
                            left: $(this).position().left,
                            top: $(this).position().top + 35
                        });
                        $(this).next(".select_option").slideDown("fast");
                    }
                    else {
                        $(this).next(".select_option").slideUp();
                    }
                }
                $(document).bind("click", function () {
                    $(".select_option").slideUp();
                });
            });


            //�󶨿������ť�ĵ���¼�
            $('#index>#code>a.clickBtn').on('click', function () {
                //�Ƴ��׼����ʼ����
                $("#index").remove();

                //�ɲ�����ť
                $('.moduleBtn').each(function (i, e) {
                    $('#btn_change').append($(e).html());
                });
                $('.moduleBtn').remove();

                //��ģ�������ť����¼�
                $('#btn_change>li:not([data-name="messagewalldanmu"])').on('click', function () {
                    var $this = $(this);
                    //������ǰ����ģ��仯�¼�
                    $('body').triggerHandler('modulechange', [$this.data('name')]);
                });

                //�����в�����ť��껬���¼�
                $('#btn_change>li').hover(function () {
                    Common.showTips(this);
                }, function () {
                    Common.removeTips();
                });

                //��ʾ������ť
                $('#btn_change').show();

                //��body�ϴ���active�¼�
                $('body').triggerHandler('active');
                //��body�ϴ���active�¼�
                $('body').triggerHandler('modulechange', [$('#btn_change>li:not(.btn_fullscreen):eq(0)').data('name')]);

            });

            $('body').on('modulechange', function (e, moduleName) {
                if (moduleName != 'qrcode') {
                    //���ض�ά���ͼ
                    $('#activityCode>#showCode').hide();
                }
                else {
                    //��ʾ��ά���ͼ
                    $('#activityCode>#showCode').show();
                }
            });
        };
        init();


        //    ---------------------------------------------------------------------------------
        var selfModuleName = 'slotmachine';
        //var Common = require('common');
        //var fireWork = require('firework');
        var moduleID = $('[data-modulename=' + selfModuleName + ']').data('moduleid');
        var scrollTime = 500; //�����ٶ�
        var IntervalTimer = parseInt(Math.random() * 500);//���ʱ��
        var scrollNumber = 5;//��������,Ĭ����5��
        var prizeID = 0; //��ƷID
        var prizeNumber = 10; //�齱����
        var isLotteryArray = []; //�н��û�
        var userArray = []; //�û��б�
        var isLotteryScrollID = 0; //�н�������������
        var sotpTime = 3000; //ֹͣ�齱ʱ��
        var prizeUserStr = '';
        var tigerUserLiWidth = 90;
        var tigerUserUlWidth = 830;
        var ulHeight = 250;
        var ulHeightHalf = 125;
        var slotmachineInit = function () {
            $('body').on('active', function () {
                $('#option_slotNumber a').click(function () {
                    selectLotteryNumber($(this));
                });
                $('body').on('click', '#tigerUserBox>ul>li>a', function () {
                    var dataLevel = $(this).parent().data('level');
                    $(this).parent().remove();
                    $('#option_slotPrize a[data-prizeid=' + dataLevel + '] label').html(parseInt($('#option_slotPrize a[data-prizeid=' + dataLevel + '] label').html()) + 1);
                    $('#tigerUserBox ul').width($('#tigerUserBox ul li').size() * tigerUserLiWidth);
                });
                $('.beginTiger').click(function () {
                    if (!$(this).hasClass('beginTiger_on')) {
                        beginTiger();
                    } else {
                        stopTiger();
                    }
                });
                $('.tiger_hidden').click(function () {
                    if ($(this).hasClass('on')) {
                        $('#tigerUser').show();
                        $(this).removeClass('on');
                    } else {
                        $('#tigerUser').hide();
                        $(this).addClass('on');
                    }
                });
                $('.tiger_submit').click(function () {
                    SubmitSlotMachineFans();
                });
                $('#tigerUser a.left').mousedown(function () {
                    isLotteryScrollID = Math.max(0, isLotteryScrollID - 1);
                    $('#tigerUserBox ul').stop().animate({'left': Math.min(0, -isLotteryScrollID * tigerUserUlWidth)});
                });
                $('#tigerUser a.right').click(function () {
                    isLotteryScrollID = Math.min(Math.ceil($("#tigerUserBox ul").width() / tigerUserUlWidth) - 1, isLotteryScrollID + 1);
                    $('#tigerUserBox ul').stop().animate({'left': -tigerUserUlWidth * isLotteryScrollID});

                });

            });
            $('body').on('modulechange', function (e, moduleName) {
                if (moduleName == selfModuleName) {
                    $('#slotmachine').show();
                    GetSlotMachineFans();
                    GetSlotMachinePrize();
                } else {
                    $('#slotmachine').hide();
                }
            });
        };
        slotmachineInit();
        //��ȡ��Ʒ��Ϣ
        var GetSlotMachinePrize = function () {
            $.get("data/GetSlotMachinePrize.json", {}, function (data) {
                if (data.length > 0) {
                    $('#option_slotPrize').empty();
                    $(data).each(function (index, element) {
                        $('#option_slotPrize').append('<a data-prizeid="' + element.Id + '" data-prizename="' + element.Name + '" data-amount="' + element.Count + '"><div>' + element.Name + '</div> <span>ʣ<label>' + element.Count + '</label>��</span></a>');
                    });
                }
                $('#option_slotPrize a').click(function () {
                    selectPrize($(this));
                });
            }, function () {
                Common.showInfo("����ʧ��,������!");
                Common.loaded();
            });
        };
        //��ȡ�û�
        var GetSlotMachineFans = function () {
            Common.loading('���ݼ�����,���Ժ�');
            userArray = [];
            $('#tigerUserBox ul').html('');
            $.get("data/GetSlotMachineFans.json", {}, function (data) {
                if (data.length > 0) {
                    userArray = data;
                    setScrollDiv();
                }

                Common.loaded();
            }, function () {
                luckUl.html("");
                Common.showInfo("����ʧ��,������!");
                Common.loaded();
            });
        }

        //��ʼ����������
        var setScrollDiv = function () {
            if (prizeNumber <= 5) {  //����Ҫ���ֵ�����
                scrollNumber = prizeNumber;
                $('.tigerMain').addClass('oneTiger');
            } else {
                $('.tigerMain').removeClass('oneTiger');
                scrollNumber = Math.ceil(prizeNumber / 2);
            }

            if (userArray.length <= 5 && prizeNumber > userArray.length) {
                scrollNumber = userArray.length;
                $('.tigerMain').addClass('oneTiger');
            }

            $('.tigerMain').html('');   //�����
            for (var i = 0; i < scrollNumber; i++) {
                $('.tigerMain').append('<div class="tigerList"><div><ul></ul></div></div>');
            }
            if (prizeNumber > 5 && prizeNumber < 10) {
                $('.tigerList').each(function () {
                    if ($(this).index() > prizeNumber - scrollNumber - 1) {
                        $(this).addClass('oneUser');
                    }
                });
            }

            var maxNumber = 0;
            for (var i = 0; i < userArray.length; i++) { //���û��б�װ����
                if (maxNumber == scrollNumber) {
                    maxNumber = 0;
                }
                $('.tigerList').eq(maxNumber).find('ul').append('<li data-headpath="' + userArray[i].HeadPath + '" data-userid="' + userArray[i].Id + '" data-nickname="' + userArray[i].NickName + '" data-headpath="' + userArray[i].HeadPath + '"><img onError="imgError(this)" src="' + userArray[i].Head + '"/></li>');
                maxNumber++;
            }

            $('.tigerList').each(function () {  //�����б�ѭ������
                var ul = $($(this).find('ul'));
                if (ul.children().size() > 1) {
                    ul.append(ul.html());
                    ul.css('top', -ul.height() + ulHeight + 'px');
                } else {
                    ul.css('top', '0');
                }
            });
        };

        //��ʼҡ��
        var beginTiger = function () {
            prizeUserStr = '';
            if (prizeID == 0) {
                Common.showInfo("��ѡ����!");
                return false;
            }
            if (prizeNumber > userArray.length) {
                Common.showInfo("�齱��������!");
                return false;
            }
            if (prizeNumber == 0) {
                Common.showInfo("�Ѿ�û�н�Ʒ��!");
                return false;
            }
            if (prizeNumber > $('#option_slotPrize a[data-prizeid=' + prizeID + ']').find('label').html()) {
                Common.showInfo("��Ʒ����������!");
                return false;
            }
            $('.beginTiger').html('ֹͣ�齱').addClass('beginTiger_on');
            $('.tigerList').each(function (i) {
                var ulBox = $(this).find('ul');
                var _height = ulBox.children().size() * ulHeightHalf;
                ulBox.height(_height);
                if (ulBox.children().size() > 2) { //������������2��ʱ��Ź���
                    setTimeout(function () {
                        beginScroll(ulBox, _height, scrollTime * (scrollNumber / 2));
                    }, IntervalTimer * i);
                } else if (ulBox.children().size() == 0) { //������������0��ʱ���Ƴ�
                    ulBox.parent().remove();
                }
            });
        };

        //����
        var beginScroll = function (obj, height, timer) {
            obj.animate({'top': -height / 2 + ulHeightHalf + 'px'}, timer, 'linear', function () {
                obj.css('top', -(height - ulHeight) + 'px');
                beginScroll(obj, height, timer);
            });
        };

        var stopTiger = function () {
            $('.beginTiger').html('��ʼ�齱').removeClass('beginTiger_on');
            isLotteryArray = [];
            var allNumber = 0;
            $('.tigerList').each(function (i) {
                var ulBox = $(this).find('ul');
                var _height = ulBox.height();
                setTimeout(function () {
                    ulBox.stop();
                    var _top = Math.ceil(parseInt(ulBox.css('top')) / ulHeightHalf) * ulHeightHalf; //����ȡ����������������ȷλ��;
                    ulBox.animate({'top': _top}, function () {
                        var userID; //�н�����Ϣ
                        var userHead;
                        var userHeadPath;
                        var userNickName;
                        //���ݲ�ͬ��״̬��ȡ�н��ˣ�1��ֻ��һ�У�2���������ģ�3��һ�����ж���
                        if ($('.oneTiger').size() > 0) {
                            ulBox.children('li').each(function () {
                                if ($(this).position().top == -_top) {
                                    userID = $(this).data('userid')
                                    userHead = $(this).html();
                                    userNickName = $(this).data('nickname');
                                    userHeadPath = $(this).data('headpath')
                                    isLotteryArray.push(userID);
                                    prizeUserStr += '<li data-level="' + prizeID + '" data-headpath="' + userHeadPath + '" data-nickname="' + userNickName + '" data-isluck="' + userID + '">' + userHead + '<span>' + userNickName + '</span></li>';
                                    $('#option_slotPrize a[data-prizeid=' + prizeID + ']').find('label').html(parseInt($('#option_slotPrize a[data-prizeid=' + prizeID + ']').find('label').html()) - 1);
                                }
                            });
                        } else {
                            ulBox.children('li').each(function () {
                                if (ulBox.parent().parent().hasClass('oneUser')) {
                                    if ($(this).position().top == -_top) {  //����ֻ��һ����
                                        userID = $(this).data('userid')
                                        userHead = $(this).html();
                                        userHeadPath = $(this).data('headpath');
                                        userNickName = $(this).data('nickname');
                                        isLotteryArray.push(userID);
                                        prizeUserStr += '<li data-level="' + prizeID + '" data-headpath="' + userHeadPath + '" data-nickname="' + userNickName + '" data-isluck="' + userID + '">' + userHead + '<span>' + userNickName + '</span></li>';
                                        $('#option_slotPrize a[data-prizeid=' + prizeID + ']').find('label').html(parseInt($('#option_slotPrize a[data-prizeid=' + prizeID + ']').find('label').html()) - 1);
                                    }
                                } else {
                                    if ($(this).position().top == -_top || $(this).position().top == -_top + ulHeightHalf) { //������������
                                        userID = $(this).data('userid')
                                        userHead = $(this).html();
                                        userHeadPath = $(this).data('headpath');
                                        userNickName = $(this).data('nickname');
                                        isLotteryArray.push(userID);
                                        prizeUserStr += '<li data-level="' + prizeID + '" data-headpath="' + userHeadPath + '" data-nickname="' + userNickName + '" data-isluck="' + userID + '">' + userHead + '<span>' + userNickName + '</span></li>';
                                        $('#option_slotPrize a[data-prizeid=' + prizeID + ']').find('label').html(parseInt($('#option_slotPrize a[data-prizeid=' + prizeID + ']').find('label').html()) - 1);
                                    }
                                }
                            });
                        }
                        isLotteryScrollID = 0;
                        allNumber++;
                        if (allNumber == $('.tigerList').size()) {
                            $('.beginTiger').removeClass('beginTiger_on'); //�ı�ҡ����ʽ
                            showLuckAnimate();
                        }
                    });
                }, IntervalTimer * (i + 3));
            });
        };

        //�ύ�н�����
        var SubmitSlotMachineFans = function () {
            var submitCount = $("#tigerUserBox li[data-hasluck!=1]").size();
            if ($("#tigerUserBox li[data-hasluck!=1]").size() == 0) {
                Common.showInfo('��û���н���');
                return false;
            }
            Common.loading("�����ύ�����Ժ�");
            var submitForm = $('<form/>');
            $("#tigerUserBox li[data-hasluck!=1]").each(function (index, element) {
                submitForm.append('<input name="[' + index + '].PrizeId" type="hidden" value="' + $(element).data('level') + '" />');
                submitForm.append('<input name="[' + index + '].FansId" type="hidden" value="' + $(element).data('isluck') + '" />');
                submitForm.append('<input name="[' + index + '].FansNickName" type="hidden" value="' + $(element).data('nickname') + '" />');
                submitForm.append('<input name="[' + index + '].FansHead" type="hidden" value="' + $(element).data('headpath') + '" />');
            });
            $.extendPost(Common.httpURL + $("#SubmitSlotMachineFans").val() + '?moduleId=' + moduleID, submitForm.serializeArray(), "json", function (data) {
                Common.loaded();
                if (data.ResultType == 1) {
                    Common.showInfo("�ύ�ɹ�", 1);
                    $("#tigerUserBox li[data-hasluck!=1]").attr('data-hasluck', 1);
                } else {
                    Common.showInfo(data.Message);
                }
            });
        }
        //ģ��selectЧ��
        var selectPrize = function (v) {
            $(v).parent().prev().find("a").html($(v).find("div").html());
            $(v).parent().prev().find("a").attr({
                "data-prizeid": $(v).data("prizeid"),
                "data-amount": $(v).data("amount")
            });
            $(v).parent().siblings(".select_option").find(".newNumber").remove();
            prizeID = $(v).data('prizeid');
            var _num = $(v).find("label").html();
            $(v).parent().next(".select").find("a").attr("data-number", Math.min(10, _num)).html(Math.min(10, _num));
            prizeNumber = Math.min(10, _num);
            if (prizeNumber > 0) {
                setScrollDiv();
            }
            $(v).parent().siblings(".select_option").find("a").each(function (index, element) {
                if ($(this).data("number") > _num) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        }
        var selectLotteryNumber = function (v) {
            $(v).parent().prev().find("a").html($(v).find("div").html());
            $(v).parent().prev().find("a").attr({"data-number": $(v).data("number")});
            prizeNumber = $(v).data("number");
            setScrollDiv();
        }

        //��ʾ�齱����
        var showLuckAnimate = function () {
            fireWork.show();
            var className = '';
            $('body').append('<div class="light"></div>');
            if (prizeNumber <= 3) {
                className = 'bigImg';
            } else if (prizeNumber > 3 && prizeNumber < 7) {
                className = 'normalImg';
            }
            $('body').append('<div id="showPrizeUser"><ul class="' + className + '">' + prizeUserStr + '</ul></div>');
            $('#showPrizeUser li').each(function () {
                $('body').append('<div data-level="' + $(this).data('level') + '" data-headpath="' + $(this).data('headpath') + '" data-nickname="' + $(this).data('nickname') + '" data-isluck="' + $(this).data('isluck') + '" style="left:' + $(this).offset().left + 'px;top:' + $(this).offset().top + 'px" class="tigerUser ' + className + '">' + $(this).html() + '</div>');
                $(this).css('opacity', 0);
            });
            $("#slotmachineFlash").css('opacity', 1).show();
            var _left = $('#tigerUserBox').offset().left;
            var _top = $('#tigerUserBox').offset().top;
            setTimeout(function () {
                $('.tigerUser').each(function (index) {
                    var _this = $(this);
                    setTimeout(function () {
                        _this.animate({
                            'left': _left + 'px',
                            'top': _top + 'px',
                            'width': '70px',
                            'height': '70px'
                        }, 'slow', function () {
                            $('#tigerUserBox ul').prepend('<li data-level="' + _this.data('level') + '" data-headpath="' + _this.data('headpath') + '" data-nickname="' + _this.data('nickname') + '" data-isluck="' + _this.data('isluck') + '" >' + _this.html() + '<a>x</a></li>');
                            $('#tigerUserBox ul').width($('#tigerUserBox ul li').size() * tigerUserLiWidth).css('left', 0);
                            _this.remove();
                        });
                    }, index * 100);
                });
            }, 2500);
            setTimeout(function () {
                fireWork.hide();
                $(".light").animate({"opacity": "0"}, "slow", function () {
                    $(".light").remove();
                });
                $('#showPrizeUser').animate({'opacity': '0'}, 'slow', function () {
                    $('#showPrizeUser').remove();
                });
            }, 3000);
            if (isLotteryArray.length > 0) { //�Ƴ����н���
                for (var i = 0; i < isLotteryArray.length; i++) {
                    $('.tigerMain li[data-userid=' + isLotteryArray[i] + ']').remove();
                    for (var j = 0; j < userArray.length; j++) {
                        if (isLotteryArray[i] == userArray[j].Id) {
                            userArray.splice(j, 1);
                        }
                    }
                }
            }
            setScrollDiv();
        }
    })(Common)
})