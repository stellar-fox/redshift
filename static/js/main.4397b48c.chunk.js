(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{238:function(e){e.exports={a:"0.4.4"}},239:function(e,t,a){e.exports=a.p+"static/media/logo.73fbe8ac.svg"},245:function(e,t,a){e.exports=a(574)},261:function(e,t,a){"undefined"==typeof self||self,e.exports=function(e){function t(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var a={};return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)t.d(n,r,function(t){return e[t]}.bind(null,r));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e){e.exports=a(262)},function(e,t){"use strict";var a,n=Math.pow,r=Math.floor,i={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(e){this.toString=function(){return"CORRUPT: "+this.message},this.message=e},invalid:function(e){this.toString=function(){return"INVALID: "+this.message},this.message=e},bug:function(e){this.toString=function(){return"BUG: "+this.message},this.message=e},notReady:function(e){this.toString=function(){return"NOT READY: "+this.message},this.message=e}}};i.bitArray={bitSlice:function(e,t,a){return e=i.bitArray._shiftRight(e.slice(t/32),32-(31&t)).slice(1),void 0===a?e:i.bitArray.clamp(e,a-t)},extract:function(e,t,a){var n=r(31&-t-a);return(-32&(t+a-1^t)?e[0|t/32]<<32-n^e[0|t/32+1]>>>n:e[0|t/32]>>>n)&(1<<a)-1},concat:function(e,t){if(0===e.length||0===t.length)return e.concat(t);var a=e[e.length-1],n=i.bitArray.getPartial(a);return 32===n?e.concat(t):i.bitArray._shiftRight(t,n,0|a,e.slice(0,e.length-1))},bitLength:function(e){var t,a=e.length;return 0===a?0:(t=e[a-1],32*(a-1)+i.bitArray.getPartial(t))},clamp:function(e,t){if(32*e.length<t)return e;var a=(e=e.slice(0,Math.ceil(t/32))).length;return t&=31,0<a&&t&&(e[a-1]=i.bitArray.partial(t,e[a-1]&2147483648>>t-1,1)),e},partial:function(e,t,a){return 32===e?t:(a?0|t:t<<32-e)+1099511627776*e},getPartial:function(e){return Math.round(e/1099511627776)||32},equal:function(e,t){if(i.bitArray.bitLength(e)!==i.bitArray.bitLength(t))return!1;var a,n=0;for(a=0;a<e.length;a++)n|=e[a]^t[a];return 0==n},_shiftRight:function(e,t,a,n){var r,s,c=0;for(void 0===n&&(n=[]);32<=t;t-=32)n.push(a),a=0;if(0===t)return n.concat(e);for(r=0;r<e.length;r++)n.push(a|e[r]>>>t),a=e[r]<<32-t;return c=e.length?e[e.length-1]:0,s=i.bitArray.getPartial(c),n.push(i.bitArray.partial(31&t+s,32<t+s?a:n.pop(),1)),n},_xor4:function(e,t){return[e[0]^t[0],e[1]^t[1],e[2]^t[2],e[3]^t[3]]},byteswapM:function(e){var t,a;for(t=0;t<e.length;++t)a=e[t],e[t]=a>>>24|a>>>8&65280|(65280&a)<<8|a<<24;return e}},i.codec.utf8String={fromBits:function(e){var t,a,n="",r=i.bitArray.bitLength(e);for(t=0;t<r/8;t++)0==(3&t)&&(a=e[t/4]),n+=String.fromCharCode(a>>>8>>>8>>>8),a<<=8;return decodeURIComponent(escape(n))},toBits:function(e){e=unescape(encodeURIComponent(e));var t,a=[],n=0;for(t=0;t<e.length;t++)n=n<<8|e.charCodeAt(t),3==(3&t)&&(a.push(n),n=0);return 3&t&&a.push(i.bitArray.partial(8*(3&t),n)),a}},i.codec.hex={fromBits:function(e){var t,a="";for(t=0;t<e.length;t++)a+=(0xf00000000000+(0|e[t])).toString(16).substr(4);return a.substr(0,i.bitArray.bitLength(e)/4)},toBits:function(e){var t,a,n=[];for(e=e.replace(/\s|0x/g,""),a=e.length,e+="00000000",t=0;t<e.length;t+=8)n.push(0^parseInt(e.substr(t,8),16));return i.bitArray.clamp(n,4*a)}},i.hash.sha256=function(e){this._key[0]||this._precompute(),e?(this._h=e._h.slice(0),this._buffer=e._buffer.slice(0),this._length=e._length):this.reset()},i.hash.sha256.hash=function(e){return(new i.hash.sha256).update(e).finalize()},i.hash.sha256.prototype={blockSize:512,reset:function(){return this._h=this._init.slice(0),this._buffer=[],this._length=0,this},update:function(e){"string"==typeof e&&(e=i.codec.utf8String.toBits(e));var t,a=this._buffer=i.bitArray.concat(this._buffer,e),n=this._length,r=this._length=n+i.bitArray.bitLength(e);if(9007199254740991<r)throw new i.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!=typeof Uint32Array){var s=new Uint32Array(a),c=0;for(t=512+n-(511&512+n);t<=r;t+=512)this._block(s.subarray(16*c,16*(c+1))),c+=1;a.splice(0,16*c)}else for(t=512+n-(511&512+n);t<=r;t+=512)this._block(a.splice(0,16));return this},finalize:function(){var e,t=this._buffer,a=this._h;for(t=i.bitArray.concat(t,[i.bitArray.partial(1,1)]),e=t.length+2;15&e;e++)t.push(0);for(t.push(r(this._length/4294967296)),t.push(0|this._length);t.length;)this._block(t.splice(0,16));return this.reset(),a},_init:[],_key:[],_precompute:function(){function e(e){return 0|4294967296*(e-r(e))}for(var t,a,i=0,s=2;64>i;s++){for(a=!0,t=2;t*t<=s;t++)if(0==s%t){a=!1;break}a&&(8>i&&(this._init[i]=e(n(s,.5))),this._key[i]=e(n(s,1/3)),i++)}},_block:function(e){var t,a,n,r,i=this._h,s=this._key,c=i[0],o=i[1],l=i[2],u=i[3],h=i[4],m=i[5],d=i[6],p=i[7];for(t=0;64>t;t++)16>t?a=e[t]:(n=e[15&t+1],r=e[15&t+14],a=e[15&t]=0|(n>>>7^n>>>18^n>>>3^n<<25^n<<14)+(r>>>17^r>>>19^r>>>10^r<<15^r<<13)+e[15&t]+e[15&t+9]),a=a+p+(h>>>6^h>>>11^h>>>25^h<<26^h<<21^h<<7)+(d^h&(m^d))+s[t],p=d,d=m,m=h,h=0|u+a,u=l,l=o,c=0|a+((o=c)&l^u&(o^l))+(o>>>2^o>>>13^o>>>22^o<<30^o<<19^o<<10);i[0]=0|i[0]+c,i[1]=0|i[1]+o,i[2]=0|i[2]+l,i[3]=0|i[3]+u,i[4]=0|i[4]+h,i[5]=0|i[5]+m,i[6]=0|i[6]+d,i[7]=0|i[7]+p}},i.hash.sha512=function(e){this._key[0]||this._precompute(),e?(this._h=e._h.slice(0),this._buffer=e._buffer.slice(0),this._length=e._length):this.reset()},i.hash.sha512.hash=function(e){return(new i.hash.sha512).update(e).finalize()},i.hash.sha512.prototype={blockSize:1024,reset:function(){return this._h=this._init.slice(0),this._buffer=[],this._length=0,this},update:function(e){"string"==typeof e&&(e=i.codec.utf8String.toBits(e));var t,a=this._buffer=i.bitArray.concat(this._buffer,e),n=this._length,r=this._length=n+i.bitArray.bitLength(e);if(9007199254740991<r)throw new i.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!=typeof Uint32Array){var s=new Uint32Array(a),c=0;for(t=1024+n-(1023&1024+n);t<=r;t+=1024)this._block(s.subarray(32*c,32*(c+1))),c+=1;a.splice(0,32*c)}else for(t=1024+n-(1023&1024+n);t<=r;t+=1024)this._block(a.splice(0,32));return this},finalize:function(){var e,t=this._buffer,a=this._h;for(t=i.bitArray.concat(t,[i.bitArray.partial(1,1)]),e=t.length+4;31&e;e++)t.push(0);for(t.push(0),t.push(0),t.push(r(this._length/4294967296)),t.push(0|this._length);t.length;)this._block(t.splice(0,32));return this.reset(),a},_init:[],_initr:[12372232,13281083,9762859,1914609,15106769,4090911,4308331,8266105],_key:[],_keyr:[2666018,15689165,5061423,9034684,4764984,380953,1658779,7176472,197186,7368638,14987916,16757986,8096111,1480369,13046325,6891156,15813330,5187043,9229749,11312229,2818677,10937475,4324308,1135541,6741931,11809296,16458047,15666916,11046850,698149,229999,945776,13774844,2541862,12856045,9810911,11494366,7844520,15576806,8533307,15795044,4337665,16291729,5553712,15684120,6662416,7413802,12308920,13816008,4303699,9366425,10176680,13195875,4295371,6546291,11712675,15708924,1519456,15772530,6568428,6495784,8568297,13007125,7492395,2515356,12632583,14740254,7262584,1535930,13146278,16321966,1853211,294276,13051027,13221564,1051980,4080310,6651434,14088940,4675607],_precompute:function(){function e(e){return 0|4294967296*(e-r(e))}function t(e){return 255&1099511627776*(e-r(e))}for(var a,i,s=0,c=2;80>s;c++){for(i=!0,a=2;a*a<=c;a++)if(0==c%a){i=!1;break}i&&(8>s&&(this._init[2*s]=e(n(c,.5)),this._init[2*s+1]=t(n(c,.5))<<24|this._initr[s]),this._key[2*s]=e(n(c,1/3)),this._key[2*s+1]=t(n(c,1/3))<<24|this._keyr[s],s++)}},_block:function(e){var t,a,n,r,i=this._h,s=this._key,c=i[0],o=i[1],l=i[2],u=i[3],h=i[4],m=i[5],d=i[6],p=i[7],f=i[8],b=i[9],g=i[10],v=i[11],y=i[12],E=i[13],w=i[14],k=i[15];if("undefined"!=typeof Uint32Array){r=Array(160);for(var x=0;32>x;x++)r[x]=e[x]}else r=e;var S=c,N=o,_=l,j=u,O=h,A=m,P=d,C=p,L=f,B=b,I=g,K=v,T=y,G=E,R=w,D=k;for(t=0;80>t;t++){if(16>t)a=r[2*t],n=r[2*t+1];else{var M=r[2*(t-15)],U=r[2*(t-15)+1],H=(M<<31|U>>>1)^(M<<24|U>>>8)^(M<<25|U>>>7),F=r[2*(t-2)],W=r[2*(t-2)+1],V=(F<<13|W>>>19)^(W<<3|F>>>29)^(F<<26|W>>>6),Y=r[2*(t-7)],z=r[2*(t-7)+1],J=r[2*(t-16)],q=r[2*(t-16)+1];a=((U<<31|M>>>1)^(U<<24|M>>>8)^M>>>7)+Y+((n=H+z)>>>0<H>>>0?1:0),a+=((W<<13|F>>>19)^(F<<3|W>>>29)^F>>>6)+((n+=V)>>>0<V>>>0?1:0),a+=J+((n+=q)>>>0<q>>>0?1:0)}r[2*t]=a|=0,r[2*t+1]=n|=0;var Z=L&I^~L&T,Q=B&K^~B&G,X=S&_^S&O^_&O,$=N&j^N&A^j&A,ee=(N<<4|S>>>28)^(S<<30|N>>>2)^(S<<25|N>>>7),te=(S<<4|N>>>28)^(N<<30|S>>>2)^(N<<25|S>>>7),ae=(B<<18|L>>>14)^(B<<14|L>>>18)^(L<<23|B>>>9),ne=(L<<18|B>>>14)^(L<<14|B>>>18)^(B<<23|L>>>9),re=s[2*t],ie=s[2*t+1],se=D+ne,ce=R+ae+(se>>>0<D>>>0?1:0);ce+=Z+((se+=Q)>>>0<Q>>>0?1:0),ce+=re+((se+=ie)>>>0<ie>>>0?1:0);var oe=te+$,le=ee+X+(oe>>>0<te>>>0?1:0);R=T,D=G,T=I,G=K,I=L,K=B,L=0|P+(ce+=a+((se=0|se+n)>>>0<n>>>0?1:0))+((B=0|C+se)>>>0<C>>>0?1:0),P=O,C=A,O=_,A=j,_=S,j=N,S=0|ce+le+((N=0|se+oe)>>>0<se>>>0?1:0)}o=i[1]=0|o+N,i[0]=0|c+S+(o>>>0<N>>>0?1:0),u=i[3]=0|u+j,i[2]=0|l+_+(u>>>0<j>>>0?1:0),m=i[5]=0|m+A,i[4]=0|h+O+(m>>>0<A>>>0?1:0),p=i[7]=0|p+C,i[6]=0|d+P+(p>>>0<C>>>0?1:0),b=i[9]=0|b+B,i[8]=0|f+L+(b>>>0<B>>>0?1:0),v=i[11]=0|v+K,i[10]=0|g+I+(v>>>0<K>>>0?1:0),E=i[13]=0|E+G,i[12]=0|y+T+(E>>>0<G>>>0?1:0),k=i[15]=0|k+D,i[14]=0|w+R+(k>>>0<D>>>0?1:0)}},i.misc.hmac=function(e,t){this._hash=t=t||i.hash.sha256;var a,n=[[],[]],r=t.prototype.blockSize/32;for(this._baseHash=[new t,new t],e.length>r&&(e=t.hash(e)),a=0;a<r;a++)n[0][a]=909522486^e[a],n[1][a]=1549556828^e[a];this._baseHash[0].update(n[0]),this._baseHash[1].update(n[1]),this._resultHash=new t(this._baseHash[0])},i.misc.hmac.prototype.encrypt=i.misc.hmac.prototype.mac=function(e){if(!this._updated)return this.update(e),this.digest(e);throw new i.exception.invalid("encrypt on already updated hmac called!")},i.misc.hmac.prototype.reset=function(){this._resultHash=new this._hash(this._baseHash[0]),this._updated=!1},i.misc.hmac.prototype.update=function(e){this._updated=!0,this._resultHash.update(e)},i.misc.hmac.prototype.digest=function(){var e=this._resultHash.finalize(),t=new this._hash(this._baseHash[1]).update(e).finalize();return this.reset(),t},e.exports&&(e.exports=i),void 0===(a=function(){return i}.apply(t,[]))||(e.exports=a)},function(e){e.exports=a(575)},function(e){e.exports=a(162)},function(e){e.exports={a:"0.4.4"}},function(e,t,a){"use strict";a.r(t),a.d(t,"ENTROPY",function(){return o}),a.d(t,"LANGUAGE",function(){return l}),a.d(t,"genMnemonic",function(){return u}),a.d(t,"validateMnemonic",function(){return h}),a.d(t,"genKeypair",function(){return m}),a.d(t,"newAddress",function(){return d}),a.d(t,"restoreAddress",function(){return p});var n=a(0),r=(a.n(n),a(2)),i=(a.n(r),a(1)),s=(a.n(i),a(3));a.n(s),a.d(t,"mnemonicToSeedHex",function(){return n.mnemonicToSeedHex});var c=a(4);a.t(4,1),a.d(t,"version",function(){return c.a});var o=Object.freeze({HIGH:256,MEDIUM:128}),l=Object.freeze({CN:"chinese_simplified",CT:"chinese_traditional",EN:"english",FR:"french",IT:"italian",JP:"japanese",KR:"korean",SP:"spanish"}),u=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:l.EN,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:o.HIGH;return Object(n.generateMnemonic)(t,void 0,n.wordlists[e])},h=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:l.EN;return Object(n.validateMnemonic)(e,n.wordlists[t])},m=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,a=function(e,t){return new i.misc.hmac(e,i.hash.sha512).encrypt(t)};return r.func.compose(s.Keypair.fromRawEd25519Seed.bind(s.Keypair),r.codec.hexToBytes,i.codec.hex.fromBits)([44,148,t].reduce(function(e,t){return a(e.slice(8),[i.codec.hex.toBits("0x00"),e.slice(0,8),i.codec.hex.toBits((2147483648+t).toString(16))].reduce(i.bitArray.concat,[]))},a(i.codec.utf8String.toBits("ed25519 seed"),i.codec.hex.toBits(e))).slice(0,8))},d=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:r.string.empty(),t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:l.EN,i=u(a),s=Object(n.mnemonicToSeedHex)(i,e),c=m(s,t);return{mnemonic:i,passphrase:e,account:t,seed:s,keypair:c}},p=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:r.string.empty(),a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,i=Object(n.mnemonicToSeedHex)(e,t),s=m(i,a);return{mnemonic:e,passphrase:t,account:a,seed:i,keypair:s}}}])},265:function(e,t){},267:function(e,t){},410:function(e,t){},411:function(e,t){},499:function(e,t){},500:function(e,t){},547:function(e,t,a){},549:function(e,t,a){},553:function(e,t,a){},555:function(e,t,a){},557:function(e,t,a){},559:function(e,t,a){},561:function(e,t,a){},566:function(e,t,a){},568:function(e,t,a){},572:function(e,t,a){},574:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(235),s=a.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(31),o=a.n(c),l=a(242),u=a(47),h=a(862),m=a(147),d=a(240),p=function(){var e=Object(u.a)(o.a.mark(function e(){var t,n,r,i,s;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([Promise.resolve().then(a.t.bind(null,261,7)),Promise.all([a.e(3),a.e(1)]).then(a.t.bind(null,686,7)),Promise.resolve().then(a.bind(null,147))]);case 2:return t=e.sent,n=Object(d.a)(t,3),r=n[0],i=n[1],s=n[2],e.abrupt("return",{redshift:r,stellar:i,toolbox:s});case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),f=a(65),b=a(236),g=a(68),v=a(66),y=a(69),E=a(861),w=function(){return r.a.createElement("div",{className:"flex-centered content"},r.a.createElement("p",{className:"title"},"Terms of Service"),r.a.createElement("p",null,"By using ",r.a.createElement("em",null,"Redshift"),', you are agreeing to the following terms and conditions. This service is provided on an "as is" basis, without any warranties. We are not responsible for any losses in Stellar native asset (XLM) or any other tokens held in your Stellar account(s) that you may incur for any reason. In no event shall'," ",r.a.createElement("em",null,"Redshift")," be held liable for anything arising out of or in any way connected with your use of this Service whether such liability is under contract. ",r.a.createElement("em",null,"Redshift")," ","shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Service. We reserve the right to modify or terminate the Service for any reason, without notice at any time. We reserve the right to alter these Terms at any time. Use at your own risk. HD account generators can be dangerous if you don't take proper security precautions. This tool can be used to restore your Stellar account from previously generated mnemonic. We recommend that this functionality only be used in case the following are true:"),r.a.createElement("ul",null,r.a.createElement("li",null,'You need immediate "',r.a.createElement("em",null,"spend access"),'" to your Stellar account'),r.a.createElement("li",null,"You are in posession of your 24 word mnemonic"),r.a.createElement("li",null,"You don't have or can't use your Ledger device at the moment")),r.a.createElement("p",null,"Once this web application is loaded there is no further network requests being made. All operations are performed in the browser. If you want to add an extra layer of security, while generating a new mnemonic, we recommend that you download the copy of the web site and run it on an air gapped computer. You can read about air gapped machines (and how to make one) in Bruce Schneier's"," ",r.a.createElement("a",{href:"https://www.schneier.com/blog/archives/2013/10/air_gaps.html"},"blog article"),"."),r.a.createElement("p",{className:"title"},"How does ",r.a.createElement("em",null,"Redshift")," work?"),r.a.createElement("p",null,"There are two modes of operation:"),r.a.createElement("p",null,r.a.createElement("strong",null,"Generate"),r.a.createElement("br",null),'24 words mnemonic (256 bits of entropy) is auto generated. The mnemonic is used to derive a seed, which serves as a basis for generating deterministic Stellar accounts. Each mnemonic can be complemented with a passphrase. The passphrase can be any UTF-8 string up to 100 characters and is "something you know" in addition to "something you have" such as your 24 word mnemonic. This prevents the perpetrators from gaining access to your account even when they get a hold of your mnemonic as they would still need your passphrase to restore the account. You can also choose to specify the account hierarchy, expressed as a positive integer index. 0 is used to generate the default account.'),r.a.createElement("p",null,r.a.createElement("strong",null,"Restore"),r.a.createElement("br",null),"If you have already generted your mnemonic phrase in the past by using a hardware wallet or this tool, you can restore your Stellar account keys by entering the 24 words. If you protected your mnemonic with a passphrase you can enter it as well. Restoring the account can really be thought of as creating the mnemonic by hand. Each word of the mnemonic is limited to 100 characters and can be any UTF-8 string. You can come up with your own phrase and it will still generate a valid Stellar account, however, this is ",r.a.createElement("strong",null,"strongly discouraged")," as it is not secure due to the low level of randomness."),r.a.createElement("p",{className:"title"},r.a.createElement("a",{href:"https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"},"BIP39")),r.a.createElement("p",{className:"subtitle"},"Hierarchical Deterministic Addresses"),r.a.createElement("p",null,"BIP39 mnemonics can be used to generate deterministic series of account addresses. The method presented here uses 24 words to generate series of deterministic Stellar key pairs. 24 word mnemonics are also used by many hardware wallets (such as Ledger Nano S). This tool can also be used to"," ",r.a.createElement("em",null,"restore")," your account based on the mnemonic that was generated earlier by either the hardware wallet or any other wallets compatible with BIP39, BIP32 and BIP44 specifications. You can find out more and take a look at Ian Coleman's"," ",r.a.createElement("a",{href:"https://iancoleman.io/bip39/"},"Mnemonic Code Converter")," ","implementation."),r.a.createElement("div",{className:"p-b p-t"}),r.a.createElement("p",{className:"title"},r.a.createElement("a",{href:"https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"},"BIP44")),r.a.createElement("p",{className:"subtitle"},"Multi-Account Hierarchy for Deterministic Wallets"),r.a.createElement("p",null,"Redshift uses BIP32 path with hardened derivation. You can choose to derive key pair for default account (with index address equal to 0) or uncheck 'Use Default Account' and select index number of desired account hierarchy. The upper limit of index number of child accounts is 2",r.a.createElement("sup",null,"31"),"."),r.a.createElement("div",{className:"p-b p-t"}),r.a.createElement("p",{className:"title"},r.a.createElement("a",{href:"https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0005.md"},"SEP-0005")),r.a.createElement("p",{className:"subtitle"},"Key Derivation Methods for Stellar Accounts"),r.a.createElement("p",null,"Stellar Ecosystem Proposal describes implementation of deterministic key derivation for Stellar accounts based on word mnemonic of different lengths. Redshift will use 24 word mnemonics in order to be compatible with Ledger devices. Different mnemonic lengths will be implemented in the future."),r.a.createElement("p",{className:"title"},"Library used:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("a",{href:"https://www.npmjs.com/package/@stellar-fox/redshift"},"redshift")," "," - Stellar HD Accounts Generator.")),r.a.createElement("p",null,r.a.createElement("a",{href:"https://github.com/stellar-fox/redshift/blob/master/library/test/test.js"},"Tested with SEP-0005 Vectors 3 and 4")))},k=function(){return r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"flex-centered"},r.a.createElement("p",{className:"title"},"Stellar Fox"),r.a.createElement("p",null,r.a.createElement("p",{className:"subtitle"},r.a.createElement("a",{href:"mailto:xcmats@protonmail.com"},"xcmats@protonmail.com"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("a",{href:"mailto:syntaxval@protonmail.com"},"syntaxval@protonmail.com"))),r.a.createElement("p",null,r.a.createElement("a",{href:"https://github.com/stellar-fox"},"https://github.com/stellar-fox")),r.a.createElement("p",null,r.a.createElement("a",{href:"https://keybase.io/xcmats/pgp_keys.asc?fingerprint=b9c1d3267b645f3f6c4585b5cbff8a9b9b5708f5"},"PGP key 1")," - ","B9C1 D326 7B64 5F3F 6C45 85B5 CBFF 8A9B 9B57 08F5"),r.a.createElement("p",null,r.a.createElement("a",{href:"https://keybase.io/syntaxval/pgp_keys.asc?fingerprint=1dfed048b07023a7d9b980297fb5ef4d9c22b993"},"PGP key 2")," - ","1DFE D048 B070 23A7 D9B9 8029 7FB5 EF4D 9C22 B993"),r.a.createElement("p",null,r.a.createElement("em",null,"Redshift")," is licensed under"," ",r.a.createElement("a",{href:"https://github.com/stellar-fox/redshift/blob/master/LICENSE"},"Apache License Version 2"),"."),r.a.createElement("p",null,"If you find this software useful and/or would like to extend your support, please donate to:")),r.a.createElement("div",{className:"break-string smaller"},r.a.createElement("p",null,r.a.createElement("a",{href:"https://stellar.expert/explorer/account/GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR"},"GAUWLOIHFR2E52DYNEYDO6ZADIDVWZKK3U77V7PMFBNOIOBNREQBHBRR"))),r.a.createElement("div",{className:"flex-centered"},r.a.createElement("p",{className:"smaller"},"\u2661 We would love to hear your feedback and suggestions.")))},x=a(241),S=a(8),N=a(261),_=(a(547),function(e){var t=e.title,a=e.content;return r.a.createElement("article",{className:"message"},r.a.createElement("div",{className:"message-header"},r.a.createElement("p",null,t)),r.a.createElement("div",{className:"message-body"},a))}),j=(a(549),function(e){var t=e.checked,a=e.handleClick,n=e.label;return r.a.createElement("button",{checked:t,onClick:a},n)}),O=(a(551),a(553),function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(g.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(i)))).state={checked:!1},a.render=function(){return r.a.createElement("div",{className:"pretty p-default p-curve p-thick"},r.a.createElement("input",{checked:a.props.isChecked,type:"checkbox",onChange:a.props.handleChange}),r.a.createElement("div",{className:"state"},r.a.createElement("label",null,a.props.label)))},a}return Object(y.a)(t,e),t}(n.Component)),A=(a(555),function(e){return r.a.createElement("div",{className:"lcars-input"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",{htmlFor:"name"},e.label),r.a.createElement("input",{value:e.value,type:e.inputType,maxLength:e.maxLength,autoComplete:e.autoComplete,onKeyPress:e.keyPress,onChange:e.handleChange}),r.a.createElement("span",null,e.subLabel))))}),P=(a(557),function(e){var t=e.handleClick,a=e.checked,n=e.value,i=e.name,s=e.label;return r.a.createElement("div",{className:"radio-tag",onClick:t},r.a.createElement("input",{defaultChecked:a,value:n,name:i,type:"radio"}),r.a.createElement("label",null,s))}),C=(a(559),function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(g.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(i)))).state={mnemonic:void 0,bip39Seed:void 0,StellarBase:!0,sjcl:!0,pubKey:void 0,secretKey:void 0,useDefaultAccount:!0,pathEditable:!1,checked:!0,derivationPath:"0",derivationPathIndex:0,derivationPrefix:"44'/148'/",buttonVisible:!0,restoring:!1,restoredPhrase:[],wordValue:m.string.empty(),passphrase:m.string.empty(),language:N.LANGUAGE.EN,languageDescription:"English",mnemonicInvalid:!1},a.setLanguage=function(e){var t=e.target;t.previousSibling.checked=!0,a.setState({language:t.previousSibling.value,languageDescription:t.textContent})},a.updateMnemonic=function(){a.setState({buttonVisible:!1});var e=Object(N.genMnemonic)(a.state.language),t=Object(N.mnemonicToSeedHex)(e,a.state.passphrase);if(a.setState({mnemonic:e,bip39Seed:t}),a.state.sjcl&&a.state.StellarBase){var n=Object(N.genKeypair)(t,a.state.derivationPathIndex);a.setState(function(e){return{pubKey:n.publicKey()}}),a.setState(function(e){return{secretKey:n.secret()}})}},a.enterMnemonic=function(){a.setState({buttonVisible:!1}),a.setState(function(e){return{restoring:1}})},a.restoreMnemonic=function(e){a.setState(function(e){return{restoring:void 0}});var t=Object(N.mnemonicToSeedHex)(e);if(a.setState({mnemonic:e,bip39Seed:t}),a.state.sjcl&&a.state.StellarBase){var n=Object(N.genKeypair)(t,a.state.derivationPathIndex);a.setState(function(e){return{pubKey:n.publicKey()}}),a.setState(function(e){return{secretKey:n.secret()}})}},a.advanceWord=function(e,t){a.setState({restoring:e+1}),a.setState({restoredPhrase:Object(x.a)(a.state.restoredPhrase).concat([t])},function(){if(24===e){var t=" ";a.state.language===N.LANGUAGE.JP&&(t="\u3000");var n=a.state.restoredPhrase.join(t);Object(N.validateMnemonic)(n,a.state.language)||a.setState({mnemonicInvalid:!0}),a.restoreMnemonic(n)}}),a.setState(function(e){return{wordValue:m.string.empty()}})},a.updateWord=function(e){a.setState({wordValue:e.target.value})},a.updatePassphrase=function(e){a.setState({passphrase:e.target.value},function(){var e=Object(N.mnemonicToSeedHex)(a.state.mnemonic,a.state.passphrase);a.setState({bip39Seed:e},function(){if(a.state.sjcl&&a.state.StellarBase&&a.state.pubKey&&!a.state.restoring){var t=Object(N.genKeypair)(e,a.state.derivationPathIndex);a.setState(function(e){return{pubKey:t.publicKey()}}),a.setState(function(e){return{secretKey:t.secret()}})}})})},a.numberedList=function(e,t){t||(t=1);var a=e.map(function(e,a){return r.a.createElement("div",{key:a},r.a.createElement("span",{className:"number"},a+t+". "),r.a.createElement("span",null,e))});return r.a.createElement("div",null,a)},a.reset=function(e){a.setState({mnemonic:void 0,bip39Seed:void 0,pubKey:void 0,secretKey:void 0,useDefaultAccount:!0,pathEditable:!1,checked:!0,derivationPath:"0",derivationPathIndex:0,derivationPrefix:"44'/148'/",buttonVisible:!0,restoring:!1,restoredPhrase:[],wordValue:m.string.empty(),passphrase:m.string.empty(),language:N.LANGUAGE.EN,languageDescription:"English",mnemonicInvalid:!1})},a.handleLoadSjcl=function(){a.setState({sjcl:!0})},a.handleLoadStellar=function(e){a.setState({StellarBase:!0})},a.handleCheckboxClick=function(e){var t=e.target;if(a.setState({useDefaultAccount:t.checked}),a.setState(function(e){return{pathEditable:!t.checked}}),t.checked&&(a.setState(function(e){return{derivationPath:"0",derivationPathIndex:0}}),a.state.pubKey)){var n=Object(N.genKeypair)(a.state.bip39Seed,0);a.setState(function(e){return{pubKey:n.publicKey()}}),a.setState(function(e){return{secretKey:n.secret()}})}},a.handlePathChange=function(e){var t=e.target;if(isNaN(t.value))return!1;var n=parseInt(t.value,10);if(a.setState({derivationPath:t.value,derivationPathIndex:n}),a.state.pubKey&&!isNaN(n)&&n>=0){var r=Object(N.genKeypair)(a.state.bip39Seed,n);a.setState(function(e){return{derivationPathIndex:n}}),a.setState(function(e){return{pubKey:r.publicKey()}}),a.setState(function(e){return{secretKey:r.secret()}})}},a.handleKeyPress=function(e){"Enter"===e.key&&a.advanceWord(a.state.restoring,a.state.wordValue)},a.renderMnemonic=function(){var e=" ";a.state.language===N.LANGUAGE.JP&&(e="\u3000");var t=a.state.mnemonic.split(e);return r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column"},a.numberedList(t.slice(0,12))),r.a.createElement("div",{className:"column"},a.numberedList(t.slice(12),13)))},a.render=function(){var e,t,n,i,s,c,o,l,u,h,m;return a.state.StellarBase||(c=r.a.createElement("div",{className:"tiny"},"\u2717\xa0StellarBase did not load.")),a.state.mnemonic&&(e=r.a.createElement("div",{className:"p-t"},r.a.createElement(_,{title:"Mnemonic [256 bits] - "+a.state.languageDescription,content:a.renderMnemonic()}),r.a.createElement("div",{className:"p-b p-t"},r.a.createElement(A,{label:"Passphrase (optional)",inputType:"text",maxLength:"100",autoComplete:"off",value:a.state.passphrase,handleChange:a.updatePassphrase.bind(Object(S.a)(Object(S.a)(a))),subLabel:"Enter mnemonic passphrase."})))),a.state.buttonVisible&&(s=r.a.createElement("div",{className:"p-b p-t"},r.a.createElement(j,{handleClick:a.updateMnemonic.bind(Object(S.a)(Object(S.a)(a))),label:"Generate"}),"\xa0\xa0\xa0",r.a.createElement(j,{handleClick:a.enterMnemonic.bind(Object(S.a)(Object(S.a)(a))),label:"Restore"}))),a.state.pubKey&&(t=r.a.createElement("div",{className:"break-string"},r.a.createElement(_,{title:"Public Key ["+a.state.derivationPrefix+a.state.derivationPath+"']",content:a.state.pubKey}))),a.state.secretKey&&(n=r.a.createElement("div",{className:"break-string"},r.a.createElement(_,{title:"Secret Key ["+a.state.derivationPrefix+a.state.derivationPath+"']",content:a.state.secretKey})),m=r.a.createElement("div",{className:"p-t p-b"},r.a.createElement(j,{handleClick:a.reset.bind(Object(S.a)(Object(S.a)(a))),label:"Reset"}))),a.state.pathEditable&&(i=r.a.createElement("div",{className:"p-b p-t"},r.a.createElement(A,{label:"Account Index",inputType:"text",maxLength:"20",autoComplete:"off",value:a.state.derivationPath,handleChange:a.handlePathChange.bind(Object(S.a)(Object(S.a)(a))),subLabel:"Account Derivation Path: ["+a.state.derivationPrefix+a.state.derivationPath+"']"}))),a.state.restoring&&(o=r.a.createElement("div",{className:"flex-centered"},r.a.createElement("p",{className:"p-t subtitle-large"},"Restoring ",a.state.languageDescription," mnemonic."),r.a.createElement("p",{className:"subtitle-large smaller"},"Type your 24 word mnemonic to restore Stellar account keys. Use 'Next' button or 'Enter' key to advance to the next word."),r.a.createElement("div",{className:"p-b p-t"},r.a.createElement(A,{label:"Word "+a.state.restoring,inputType:"text",maxLength:"100",autoComplete:"off",value:a.state.wordValue,keyPress:a.handleKeyPress.bind(Object(S.a)(Object(S.a)(a))),handleChange:a.updateWord.bind(Object(S.a)(Object(S.a)(a))),subLabel:"Enter word number: "+a.state.restoring})),r.a.createElement(j,{handleClick:a.advanceWord.bind(Object(S.a)(Object(S.a)(a)),a.state.restoring,a.state.wordValue),label:"Next"}))),!a.state.restoring&&a.state.mnemonic&&(l=r.a.createElement("div",{className:"p-b p-t"},r.a.createElement(O,{isChecked:a.state.useDefaultAccount,handleChange:a.handleCheckboxClick.bind(Object(S.a)(Object(S.a)(a))),label:"Use Default Account"}))),a.state.mnemonic||a.state.restoring||(u=r.a.createElement("div",null,r.a.createElement("div",{className:"flex-row-centered column"},r.a.createElement(P,{checked:"true",value:N.LANGUAGE.EN,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"English"}),"\xa0\xa0",r.a.createElement(P,{value:N.LANGUAGE.SP,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"Espa\xf1ol"}),"\xa0\xa0",r.a.createElement(P,{value:N.LANGUAGE.FR,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"Fran\xe7ais"}),"\xa0\xa0",r.a.createElement(P,{value:N.LANGUAGE.IT,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"Italiano"})),r.a.createElement("div",{className:"flex-row-centered column"},r.a.createElement(P,{value:N.LANGUAGE.JP,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"\u65e5\u672c\u8a9e"}),"\xa0\xa0",r.a.createElement(P,{value:N.LANGUAGE.CN,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"\u4e2d\u6587(\u7b80\u4f53)"}),"\xa0\xa0",r.a.createElement(P,{value:N.LANGUAGE.CT,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"\u4e2d\u6587(\u7e41\u9ad4)"}),"\xa0\xa0",r.a.createElement(P,{value:N.LANGUAGE.KR,handleClick:a.setLanguage.bind(Object(S.a)(Object(S.a)(a))),name:"language",label:"\ud55c\uad6d\uc5b4"})))),a.state.mnemonicInvalid&&(h=r.a.createElement("div",{className:"warning"},r.a.createElement("p",{className:"warning-title"},"Warning: Checksum Invalid"),r.a.createElement("p",{className:"warning-subtitle"},"The words you entered did not pass checksum validation. This means that either you mistyped some of the words or the phrase you entered was not generated by this application. It is however possible to use the phrase you restored to generate account keys. You can try entering your phrase again by clicking 'Reset' button."))),r.a.createElement("div",null,r.a.createElement("div",{className:"flex-centered"},r.a.createElement("p",{className:"title"},"Redshift"),r.a.createElement("p",{className:"subtitle"},"Stellar HD Address Generator"),u,s,h,e,l,i,o),r.a.createElement("div",{className:"p-t public"},t),r.a.createElement("div",{className:"p-t secret"},n),r.a.createElement("div",{className:"flex-centered"},r.a.createElement("div",null,c),m))},a}return Object(y.a)(t,e),t}(n.Component)),L=(a(561),function(e){function t(){return Object(f.a)(this,t),Object(g.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(y.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"main-content"},r.a.createElement(E.a,{exact:!0,path:"/redshift/",component:C}),r.a.createElement(E.a,{exact:!0,path:"/redshift/about",component:w}),r.a.createElement(E.a,{exact:!0,path:"/redshift/contact",component:k}))}}]),t}(n.Component)),B=a(238),I=(a(566),function(){return r.a.createElement("div",{className:"footer"},r.a.createElement("footer",null,r.a.createElement("div",null,"\xa0\xa9 \xa0\xa0",r.a.createElement("span",{class:"footersfox"},r.a.createElement("b",null,r.a.createElement("a",{href:"https://stellarfox.net"},"Stellar Fox"))),"\xa0\xa0 ",r.a.createElement("span",{class:"footermoji","aria-label":"fox",role:"img"},"\ud83e\udd8a")," \xa0\xa02017-2018."),r.a.createElement("div",{className:"right"},"Made with \xa0",r.a.createElement("span",{class:"footerheart","aria-label":"love",role:"img"},"\u2764"),"\xa0 in ",m.array.draw(["Wroc\u0142aw","Berlin","Bangkok"]),". ver. ",r.a.createElement("b",null,B.a)," \xa0\xa0 \xa0",r.a.createElement("span",{class:"footermoji","aria-label":"rocket",role:"img"},"\ud83d\ude80"),"\xa0")))}),K=a(863),T=a(239),G=a.n(T),R=(a(568),function(){return r.a.createElement("div",{className:"navbar"},r.a.createElement("nav",null,r.a.createElement("img",{src:G.a,className:"company-logo",alt:"logo"}),r.a.createElement("div",{className:"right"},r.a.createElement(K.a,{exact:!0,activeClassName:"selected",to:"/redshift/"},"Home"),"\u2758",r.a.createElement(K.a,{exact:!0,activeClassName:"selected",to:"/redshift/about"},"About"),"\u2758",r.a.createElement(K.a,{exact:!0,activeClassName:"selected",to:"/redshift/contact"},"Contact"))))});a(570),a(572);Object(m.devEnv)()&&Object(m.isObject)(window)&&Object(u.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=l.a,e.t1={},e.next=4,p();case 4:e.t2=e.sent,window.rs=(0,e.t0)(e.t1,e.t2);case 6:case"end":return e.stop()}},e,this)}))();s.a.render(r.a.createElement(function(){return r.a.createElement(h.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(R,null),r.a.createElement(L,null),r.a.createElement(I,null)))}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[245,4,2]]]);
//# sourceMappingURL=main.4397b48c.chunk.js.map