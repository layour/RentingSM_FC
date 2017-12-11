summerready = function() {
   var top = $('.um-header').height() + $('.navbar').height();
   summer.openFrameGroup({
      id: 'payList',
      background: '#ffffff',
      scrollEnabled: false,
      position: {
         top: top,
         bottom: 0,
         left: 0,
         right: 0
      },
      index: 0,
      frames: [
         {
            id: 'all',
            url: 'html/repayApply/payList/all.html',
            bgColor: '#ffffff',
            hidden: false
         }, {
            id: 'toBeSubmitted',
            url: 'html/repayApply/payList/toBeSubmitted.html',
            bgColor: '#ffffff',
            hidden: true
         }, {
            id: 'loaning',
            url: 'html/repayApply/payList/loaning.html',
            bgColor: '#ffffff',
            hidden: true
         }, {
            id: 'loaned',
            url: 'html/repayApply/payList/loaned.html',
            bgColor: '#ffffff',
            hidden: true
         }, {
            id: 'rejected',
            url: 'html/repayApply/payList/rejected.html',
            bgColor: '#ffffff',
            hidden: true
         }, {
            id: 'notPass',
            url: 'html/repayApply/payList/notPass.html',
            bgColor: '#ffffff',
            hidden: true
         }
      ],
   }, function(ret, err) {
      var index = ret.index;
   });
}
$(function() {
   $('.pay_list li').on('click', function() {
      var tar = $(this).index();
      $('.pay_list li').removeClass('active');
      $(this).addClass('active');
      summer.setFrameGroupAttr({id: 'payList', index: tar});
   });
});
