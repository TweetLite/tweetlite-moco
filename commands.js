 module.exports = [
	 {
		texts:['hello world','hi','wtf'],
    message:true,
    mention:false,
		reply(){
			return 'hi human';
		}
   },
   {
     texts:['ne kadar kaldı?','ne zaman?','tarih'],
     message:true,
     mention:true,
     reply() {
       return 'Bum!';
     }
   },
   {
     texts:['ne kadar kaldı?','xxx?','xvdgf'],
     message:true,
     mention:true,
     reply() {
       return 'xxx?';
     }
   }
 ]
