// ==UserScript==
// @name         Isabelle Unicode for Bitbucket
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Replace isabelle symbol representations with unicode versions in bitbucket
// @author       Scott Buckley and Mitchell Buckley
// @match        https://bitbucket.ts.data61.csiro.au/*
// @match        http://pubg.buck.ly/test/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var replaces = [
        ["\\&lt;zero&gt;", "&#x01d7ec;"],
        ["\\&lt;one&gt;", "&#x01d7ed;"],
        ["\\&lt;two&gt;", "&#x01d7ee;"],
        ["\\&lt;three&gt;", "&#x01d7ef;"],
        ["\\&lt;four&gt;", "&#x01d7f0;"],
        ["\\&lt;five&gt;", "&#x01d7f1;"],
        ["\\&lt;six&gt;", "&#x01d7f2;"],
        ["\\&lt;seven&gt;", "&#x01d7f3;"],
        ["\\&lt;eight&gt;", "&#x01d7f4;"],
        ["\\&lt;nine&gt;", "&#x01d7f5;"],
        ["\\&lt;A&gt;", "&#x01d49c;"],
        ["\\&lt;B&gt;", "&#x00212c;"],
        ["\\&lt;C&gt;", "&#x01d49e;"],
        ["\\&lt;D&gt;", "&#x01d49f;"],
        ["\\&lt;E&gt;", "&#x002130;"],
        ["\\&lt;F&gt;", "&#x002131;"],
        ["\\&lt;G&gt;", "&#x01d4a2;"],
        ["\\&lt;H&gt;", "&#x00210b;"],
        ["\\&lt;I&gt;", "&#x002110;"],
        ["\\&lt;J&gt;", "&#x01d4a5;"],
        ["\\&lt;K&gt;", "&#x01d4a6;"],
        ["\\&lt;L&gt;", "&#x002112;"],
        ["\\&lt;M&gt;", "&#x002133;"],
        ["\\&lt;N&gt;", "&#x01d4a9;"],
        ["\\&lt;O&gt;", "&#x01d4aa;"],
        ["\\&lt;P&gt;", "&#x01d4ab;"],
        ["\\&lt;Q&gt;", "&#x01d4ac;"],
        ["\\&lt;R&gt;", "&#x00211b;"],
        ["\\&lt;S&gt;", "&#x01d4ae;"],
        ["\\&lt;T&gt;", "&#x01d4af;"],
        ["\\&lt;U&gt;", "&#x01d4b0;"],
        ["\\&lt;V&gt;", "&#x01d4b1;"],
        ["\\&lt;W&gt;", "&#x01d4b2;"],
        ["\\&lt;X&gt;", "&#x01d4b3;"],
        ["\\&lt;Y&gt;", "&#x01d4b4;"],
        ["\\&lt;Z&gt;", "&#x01d4b5;"],
        ["\\&lt;a&gt;", "&#x01d5ba;"],
        ["\\&lt;b&gt;", "&#x01d5bb;"],
        ["\\&lt;c&gt;", "&#x01d5bc;"],
        ["\\&lt;d&gt;", "&#x01d5bd;"],
        ["\\&lt;e&gt;", "&#x01d5be;"],
        ["\\&lt;f&gt;", "&#x01d5bf;"],
        ["\\&lt;g&gt;", "&#x01d5c0;"],
        ["\\&lt;h&gt;", "&#x01d5c1;"],
        ["\\&lt;i&gt;", "&#x01d5c2;"],
        ["\\&lt;j&gt;", "&#x01d5c3;"],
        ["\\&lt;k&gt;", "&#x01d5c4;"],
        ["\\&lt;l&gt;", "&#x01d5c5;"],
        ["\\&lt;m&gt;", "&#x01d5c6;"],
        ["\\&lt;n&gt;", "&#x01d5c7;"],
        ["\\&lt;o&gt;", "&#x01d5c8;"],
        ["\\&lt;p&gt;", "&#x01d5c9;"],
        ["\\&lt;q&gt;", "&#x01d5ca;"],
        ["\\&lt;r&gt;", "&#x01d5cb;"],
        ["\\&lt;s&gt;", "&#x01d5cc;"],
        ["\\&lt;t&gt;", "&#x01d5cd;"],
        ["\\&lt;u&gt;", "&#x01d5ce;"],
        ["\\&lt;v&gt;", "&#x01d5cf;"],
        ["\\&lt;w&gt;", "&#x01d5d0;"],
        ["\\&lt;x&gt;", "&#x01d5d1;"],
        ["\\&lt;y&gt;", "&#x01d5d2;"],
        ["\\&lt;z&gt;", "&#x01d5d3;"],
        ["\\&lt;AA&gt;", "&#x01d504;"],
        ["\\&lt;BB&gt;", "&#x01d505;"],
        ["\\&lt;CC&gt;", "&#x00212d;"],
        ["\\&lt;DD&gt;", "&#x01d507;"],
        ["\\&lt;EE&gt;", "&#x01d508;"],
        ["\\&lt;FF&gt;", "&#x01d509;"],
        ["\\&lt;GG&gt;", "&#x01d50a;"],
        ["\\&lt;HH&gt;", "&#x00210c;"],
        ["\\&lt;II&gt;", "&#x002111;"],
        ["\\&lt;JJ&gt;", "&#x01d50d;"],
        ["\\&lt;KK&gt;", "&#x01d50e;"],
        ["\\&lt;LL&gt;", "&#x01d50f;"],
        ["\\&lt;MM&gt;", "&#x01d510;"],
        ["\\&lt;NN&gt;", "&#x01d511;"],
        ["\\&lt;OO&gt;", "&#x01d512;"],
        ["\\&lt;PP&gt;", "&#x01d513;"],
        ["\\&lt;QQ&gt;", "&#x01d514;"],
        ["\\&lt;RR&gt;", "&#x00211c;"],
        ["\\&lt;SS&gt;", "&#x01d516;"],
        ["\\&lt;TT&gt;", "&#x01d517;"],
        ["\\&lt;UU&gt;", "&#x01d518;"],
        ["\\&lt;VV&gt;", "&#x01d519;"],
        ["\\&lt;WW&gt;", "&#x01d51a;"],
        ["\\&lt;XX&gt;", "&#x01d51b;"],
        ["\\&lt;YY&gt;", "&#x01d51c;"],
        ["\\&lt;ZZ&gt;", "&#x002128;"],
        ["\\&lt;aa&gt;", "&#x01d51e;"],
        ["\\&lt;bb&gt;", "&#x01d51f;"],
        ["\\&lt;cc&gt;", "&#x01d520;"],
        ["\\&lt;dd&gt;", "&#x01d521;"],
        ["\\&lt;ee&gt;", "&#x01d522;"],
        ["\\&lt;ff&gt;", "&#x01d523;"],
        ["\\&lt;gg&gt;", "&#x01d524;"],
        ["\\&lt;hh&gt;", "&#x01d525;"],
        ["\\&lt;ii&gt;", "&#x01d526;"],
        ["\\&lt;jj&gt;", "&#x01d527;"],
        ["\\&lt;kk&gt;", "&#x01d528;"],
        ["\\&lt;ll&gt;", "&#x01d529;"],
        ["\\&lt;mm&gt;", "&#x01d52a;"],
        ["\\&lt;nn&gt;", "&#x01d52b;"],
        ["\\&lt;oo&gt;", "&#x01d52c;"],
        ["\\&lt;pp&gt;", "&#x01d52d;"],
        ["\\&lt;qq&gt;", "&#x01d52e;"],
        ["\\&lt;rr&gt;", "&#x01d52f;"],
        ["\\&lt;ss&gt;", "&#x01d530;"],
        ["\\&lt;tt&gt;", "&#x01d531;"],
        ["\\&lt;uu&gt;", "&#x01d532;"],
        ["\\&lt;vv&gt;", "&#x01d533;"],
        ["\\&lt;ww&gt;", "&#x01d534;"],
        ["\\&lt;xx&gt;", "&#x01d535;"],
        ["\\&lt;yy&gt;", "&#x01d536;"],
        ["\\&lt;zz&gt;", "&#x01d537;"],
        ["\\&lt;alpha&gt;", "&#x0003b1;"],
        ["\\&lt;beta&gt;", "&#x0003b2;"],
        ["\\&lt;gamma&gt;", "&#x0003b3;"],
        ["\\&lt;delta&gt;", "&#x0003b4;"],
        ["\\&lt;epsilon&gt;", "&#x0003b5;"],
        ["\\&lt;zeta&gt;", "&#x0003b6;"],
        ["\\&lt;eta&gt;", "&#x0003b7;"],
        ["\\&lt;theta&gt;", "&#x0003b8;"],
        ["\\&lt;iota&gt;", "&#x0003b9;"],
        ["\\&lt;kappa&gt;", "&#x0003ba;"],
        ["\\&lt;lambda&gt;", "&#x0003bb;"],
        ["\\&lt;mu&gt;", "&#x0003bc;"],
        ["\\&lt;nu&gt;", "&#x0003bd;"],
        ["\\&lt;xi&gt;", "&#x0003be;"],
        ["\\&lt;pi&gt;", "&#x0003c0;"],
        ["\\&lt;rho&gt;", "&#x0003c1;"],
        ["\\&lt;sigma&gt;", "&#x0003c3;"],
        ["\\&lt;tau&gt;", "&#x0003c4;"],
        ["\\&lt;upsilon&gt;", "&#x0003c5;"],
        ["\\&lt;phi&gt;", "&#x0003c6;"],
        ["\\&lt;chi&gt;", "&#x0003c7;"],
        ["\\&lt;psi&gt;", "&#x0003c8;"],
        ["\\&lt;omega&gt;", "&#x0003c9;"],
        ["\\&lt;Gamma&gt;", "&#x000393;"],
        ["\\&lt;Delta&gt;", "&#x000394;"],
        ["\\&lt;Theta&gt;", "&#x000398;"],
        ["\\&lt;Lambda&gt;", "&#x00039b;"],
        ["\\&lt;Xi&gt;", "&#x00039e;"],
        ["\\&lt;Pi&gt;", "&#x0003a0;"],
        ["\\&lt;Sigma&gt;", "&#x0003a3;"],
        ["\\&lt;Upsilon&gt;", "&#x0003a5;"],
        ["\\&lt;Phi&gt;", "&#x0003a6;"],
        ["\\&lt;Psi&gt;", "&#x0003a8;"],
        ["\\&lt;Omega&gt;", "&#x0003a9;"],
        ["\\&lt;bool&gt;", "&#x01d539;"],
        ["\\&lt;complex&gt;", "&#x002102;"],
        ["\\&lt;nat&gt;", "&#x002115;"],
        ["\\&lt;rat&gt;", "&#x00211a;"],
        ["\\&lt;real&gt;", "&#x00211d;"],
        ["\\&lt;int&gt;", "&#x002124;"],
        ["\\&lt;leftarrow&gt;", "&#x002190;"],
        ["\\&lt;longleftarrow&gt;", "&#x0027f5;"],
        ["\\&lt;longlongleftarrow&gt;", "&#x00290e;"],
        ["\\&lt;longlonglongleftarrow", " 0x0021e;"],
        ["\\&lt;rightarrow&gt;", "&#x002192;"],
        ["\\&lt;longrightarrow&gt;", "&#x0027f6;"],
        ["\\&lt;longlongrightarrow&gt;", "&#x00290f;"],
        ["\\&lt;longlonglongrightarrow&gt;", "&#x0021e2;"],
        ["\\&lt;Leftarrow&gt;", "&#x0021d0;"],
        ["\\&lt;Longleftarrow&gt;", "&#x0027f8;"],
        ["\\&lt;Lleftarrow&gt;", "&#x0021da;"],
        ["\\&lt;Rightarrow&gt;", "&#x0021d2;"],
        ["\\&lt;Longrightarrow&gt;", "&#x0027f9;"],
        ["\\&lt;Rrightarrow&gt;", "&#x0021db;"],
        ["\\&lt;leftrightarrow&gt;", "&#x002194;"],
        ["\\&lt;longleftrightarrow&gt;", "&#x0027f7;"],
        ["\\&lt;Leftrightarrow&gt;", "&#x0021d4;"],
        ["\\&lt;Longleftrightarrow&gt;", "&#x0027fa;"],
        ["\\&lt;mapsto&gt;", "&#x0021a6;"],
        ["\\&lt;longmapsto&gt;", "&#x0027fc;"],
        ["\\&lt;midarrow&gt;", "&#x002500;"],
        ["\\&lt;Midarrow&gt;", "&#x002550;"],
        ["\\&lt;hookleftarrow&gt;", "&#x0021a9;"],
        ["\\&lt;hookrightarrow&gt;", "&#x0021aa;"],
        ["\\&lt;leftharpoondown&gt;", "&#x0021bd;"],
        ["\\&lt;rightharpoondown&gt;", "&#x0021c1;"],
        ["\\&lt;leftharpoonup&gt;", "&#x0021bc;"],
        ["\\&lt;rightharpoonup&gt;", "&#x0021c0;"],
        ["\\&lt;rightleftharpoons&gt;", "&#x0021cc;"],
        ["\\&lt;leadsto&gt;", "&#x00219d;"],
        ["\\&lt;downharpoonleft&gt;", "&#x0021c3;"],
        ["\\&lt;downharpoonright&gt;", "&#x0021c2;"],
        ["\\&lt;upharpoonleft&gt;", "&#x0021bf;"],
        ["#\\&lt;upharpoonright&gt;", " 0x0021b;"],
        ["\\&lt;restriction&gt;", "&#x0021be;"],
        ["\\&lt;Colon&gt;", "&#x002237;"],
        ["\\&lt;up&gt;", "&#x002191;"],
        ["\\&lt;Up&gt;", "&#x0021d1;"],
        ["\\&lt;down&gt;", "&#x002193;"],
        ["\\&lt;Down&gt;", "&#x0021d3;"],
        ["\\&lt;updown&gt;", "&#x002195;"],
        ["\\&lt;Updown&gt;", "&#x0021d5;"],
        ["\\&lt;langle&gt;", "&#x0027e8;"],
        ["\\&lt;rangle&gt;", "&#x0027e9;"],
        ["\\&lt;lceil&gt;", "&#x002308;"],
        ["\\&lt;rceil&gt;", "&#x002309;"],
        ["\\&lt;lfloor&gt;", "&#x00230a;"],
        ["\\&lt;rfloor&gt;", "&#x00230b;"],
        ["\\&lt;lparr&gt;", "&#x002987;"],
        ["\\&lt;rparr&gt;", "&#x002988;"],
        ["\\&lt;lbrakk&gt;", "&#x0027e6;"],
        ["\\&lt;rbrakk&gt;", "&#x0027e7;"],
        ["\\&lt;lbrace&gt;", "&#x002983;"],
        ["\\&lt;rbrace&gt;", "&#x002984;"],
        ["\\&lt;guillemotleft&gt;", "&#x0000ab;"],
        ["\\&lt;guillemotright&gt;", "&#x0000bb;"],
        ["\\&lt;bottom&gt;", "&#x0022a5;"],
        ["\\&lt;top&gt;", "&#x0022a4;"],
        ["\\&lt;and&gt;", "&#x002227;"],
        ["\\&lt;And&gt;", "&#x0022c0;"],
        ["\\&lt;or&gt;", "&#x002228;"],
        ["\\&lt;Or&gt;", "&#x0022c1;"],
        ["\\&lt;forall&gt;", "&#x002200;"],
        ["\\&lt;exists&gt;", "&#x002203;"],
        ["\\&lt;nexists&gt;", "&#x002204;"],
        ["\\&lt;not&gt;", "&#x0000ac;"],
        ["\\&lt;circle&gt;", "&#x0025cb;"],
        ["\\&lt;box&gt;", "&#x0025a1;"],
        ["\\&lt;diamond&gt;", "&#x0025c7;"],
        ["\\&lt;diamondop&gt;", "&#x0022c4;"],
        ["\\&lt;turnstile&gt;", "&#x0022a2;"],
        ["\\&lt;Turnstile&gt;", "&#x0022a8;"],
        ["\\&lt;tturnstile&gt;", "&#x0022a9;"],
        ["\\&lt;TTurnstile&gt;", "&#x0022ab;"],
        ["\\&lt;stileturn&gt;", "&#x0022a3;"],
        ["\\&lt;surd&gt;", "&#x00221a;"],
        ["\\&lt;le&gt;", "&#x002264;"],
        ["\\&lt;ge&gt;", "&#x002265;"],
        ["\\&lt;lless&gt;", "&#x00226a;"],
        ["\\&lt;ggreater&gt;", "&#x00226b;"],
        ["\\&lt;lesssim&gt;", "&#x002272;"],
        ["\\&lt;greatersim&gt;", "&#x002273;"],
        ["\\&lt;lessapprox&gt;", "&#x002a85;"],
        ["\\&lt;greaterapprox&gt;", "&#x002a86;"],
        ["\\&lt;in&gt;", "&#x002208;"],
        ["\\&lt;notin&gt;", "&#x002209;"],
        ["\\&lt;subset&gt;", "&#x002282;"],
        ["\\&lt;supset&gt;", "&#x002283;"],
        ["\\&lt;subseteq&gt;", "&#x002286;"],
        ["\\&lt;supseteq&gt;", "&#x002287;"],
        ["\\&lt;sqsubset&gt;", "&#x00228f;"],
        ["\\&lt;sqsupset&gt;", "&#x002290;"],
        ["\\&lt;sqsubseteq&gt;", "&#x002291;"],
        ["\\&lt;sqsupseteq&gt;", "&#x002292;"],
        ["\\&lt;inter&gt;", "&#x002229;"],
        ["\\&lt;Inter&gt;", "&#x0022c2;"],
        ["\\&lt;union&gt;", "&#x00222a;"],
        ["\\&lt;Union&gt;", "&#x0022c3;"],
        ["\\&lt;squnion&gt;", "&#x002294;"],
        ["\\&lt;Squnion&gt;", "&#x002a06;"],
        ["\\&lt;sqinter&gt;", "&#x002293;"],
        ["\\&lt;Sqinter&gt;", "&#x002a05;"],
        ["\\&lt;setminus&gt;", "&#x002216;"],
        ["\\&lt;propto&gt;", "&#x00221d;"],
        ["\\&lt;uplus&gt;", "&#x00228e;"],
        ["\\&lt;Uplus&gt;", "&#x002a04;"],
        ["\\&lt;noteq&gt;", "&#x002260;"],
        ["\\&lt;sim&gt;", "&#x00223c;"],
        ["\\&lt;doteq&gt;", "&#x002250;"],
        ["\\&lt;simeq&gt;", "&#x002243;"],
        ["\\&lt;approx&gt;", "&#x002248;"],
        ["\\&lt;asymp&gt;", "&#x00224d;"],
        ["\\&lt;cong&gt;", "&#x002245;"],
        ["\\&lt;smile&gt;", "&#x002323;"],
        ["\\&lt;equiv&gt;", "&#x002261;"],
        ["\\&lt;frown&gt;", "&#x002322;"],
        ["\\&lt;Join&gt;", "&#x0022c8;"],
        ["\\&lt;bowtie&gt;", "&#x002a1d;"],
        ["\\&lt;prec&gt;", "&#x00227a;"],
        ["\\&lt;succ&gt;", "&#x00227b;"],
        ["\\&lt;preceq&gt;", "&#x00227c;"],
        ["\\&lt;succeq&gt;", "&#x00227d;"],
        ["\\&lt;parallel&gt;", "&#x002225;"],
        ["\\&lt;bar&gt;", "&#x0000a6;"],
        ["\\&lt;plusminus&gt;", "&#x0000b1;"],
        ["\\&lt;minusplus&gt;", "&#x002213;"],
        ["\\&lt;times&gt;", "&#x0000d7;"],
        ["\\&lt;div&gt;", "&#x0000f7;"],
        ["\\&lt;cdot&gt;", "&#x0022c5;"],
        ["\\&lt;star&gt;", "&#x0022c6;"],
        ["\\&lt;bullet&gt;", "&#x002219;"],
        ["\\&lt;circ&gt;", "&#x002218;"],
        ["\\&lt;dagger&gt;", "&#x002020;"],
        ["\\&lt;ddagger&gt;", "&#x002021;"],
        ["\\&lt;lhd&gt;", "&#x0022b2;"],
        ["\\&lt;rhd&gt;", "&#x0022b3;"],
        ["\\&lt;unlhd&gt;", "&#x0022b4;"],
        ["\\&lt;unrhd&gt;", "&#x0022b5;"],
        ["\\&lt;triangleleft&gt;", "&#x0025c3;"],
        ["\\&lt;triangleright&gt;", "&#x0025b9;"],
        ["\\&lt;triangle&gt;", "&#x0025b3;"],
        ["\\&lt;triangleq&gt;", "&#x00225c;"],
        ["\\&lt;oplus&gt;", "&#x002295;"],
        ["\\&lt;Oplus&gt;", "&#x002a01;"],
        ["\\&lt;otimes&gt;", "&#x002297;"],
        ["\\&lt;Otimes&gt;", "&#x002a02;"],
        ["\\&lt;odot&gt;", "&#x002299;"],
        ["\\&lt;Odot&gt;", "&#x002a00;"],
        ["\\&lt;ominus&gt;", "&#x002296;"],
        ["\\&lt;oslash&gt;", "&#x002298;"],
        ["\\&lt;dots&gt;", "&#x002026;"],
        ["\\&lt;cdots&gt;", "&#x0022ef;"],
        ["\\&lt;Sum&gt;", "&#x002211;"],
        ["\\&lt;Prod&gt;", "&#x00220f;"],
        ["\\&lt;Coprod&gt;", "&#x002210;"],
        ["\\&lt;infinity&gt;", "&#x00221e;"],
        ["\\&lt;integral&gt;", "&#x00222b;"],
        ["\\&lt;ointegral&gt;", "&#x00222e;"],
        ["\\&lt;clubsuit&gt;", "&#x002663;"],
        ["\\&lt;diamondsuit&gt;", "&#x002662;"],
        ["\\&lt;heartsuit&gt;", "&#x002661;"],
        ["\\&lt;spadesuit&gt;", "&#x002660;"],
        ["\\&lt;aleph&gt;", "&#x002135;"],
        ["\\&lt;emptyset&gt;", "&#x002205;"],
        ["\\&lt;nabla&gt;", "&#x002207;"],
        ["\\&lt;partial&gt;", "&#x002202;"],
        ["\\&lt;flat&gt;", "&#x00266d;"],
        ["\\&lt;natural&gt;", "&#x00266e;"],
        ["\\&lt;sharp&gt;", "&#x00266f;"],
        ["\\&lt;angle&gt;", "&#x002220;"],
        ["\\&lt;copyright&gt;", "&#x0000a9;"],
        ["\\&lt;registered&gt;", "&#x0000ae;"],
        ["\\&lt;hyphen&gt;", "&#x002010;"],
        ["\\&lt;inverse&gt;", "&#x0000af;"],
        ["\\&lt;onequarter&gt;", "&#x0000bc;"],
        ["\\&lt;onehalf&gt;", "&#x0000bd;"],
        ["\\&lt;threequarters&gt;", "&#x0000be;"],
        ["\\&lt;ordfeminine&gt;", "&#x0000aa;"],
        ["\\&lt;ordmasculine&gt;", "&#x0000ba;"],
        ["\\&lt;section&gt;", "&#x0000a7;"],
        ["\\&lt;paragraph&gt;", "&#x0000b6;"],
        ["\\&lt;exclamdown&gt;", "&#x0000a1;"],
        ["\\&lt;questiondown&gt;", "&#x0000bf;"],
        ["\\&lt;euro&gt;", "&#x0020ac;"],
        ["\\&lt;pounds&gt;", "&#x0000a3;"],
        ["\\&lt;yen&gt;", "&#x0000a5;"],
        ["\\&lt;cent&gt;", "&#x0000a2;"],
        ["\\&lt;currency&gt;", "&#x0000a4;"],
        ["\\&lt;degree&gt;", "&#x0000b0;"],
        ["\\&lt;amalg&gt;", "&#x002a3f;"],
        ["\\&lt;mho&gt;", "&#x002127;"],
        ["\\&lt;lozenge&gt;", "&#x0025ca;"],
        ["\\&lt;wp&gt;", "&#x002118;"],
        ["\\&lt;wrong&gt;", "&#x002240;"],
        ["\\&lt;acute&gt;", "&#x0000b4;"],
        ["\\&lt;index&gt;", "&#x000131;"],
        ["\\&lt;dieresis&gt;", "&#x0000a8;"],
        ["\\&lt;cedilla&gt;", "&#x0000b8;"],
        ["\\&lt;hungarumlaut&gt;", "&#x0002dd;"],
        ["\\&lt;bind&gt;", "&#x00291c;"],
        ["\\&lt;then&gt;", "&#x002aa2;"],
        ["\\&lt;some&gt;", "&#x0003f5;"],
        ["\\&lt;hole&gt;", "&#x002311;"],
        ["\\&lt;newline&gt;", "&#x0023ce;"],
        ["\\&lt;comment&gt;", "&#x002015;"],
        ["\\&lt;^cancel&gt;", "&#x002326;"],
        ["\\&lt;open&gt;", "&#x002039;"],
        ["\\&lt;close&gt;", "&#x00203a;"],
        ["\\&lt;^here&gt;", "&#x002302;"],
        ["\\&lt;^undefined&gt;", "&#x002756;"],
        ["\\&lt;^noindent&gt;", "&#x0021e4;"],
        ["\\&lt;^smallskip&gt;", "&#x002508;"],
        ["\\&lt;^medskip&gt;", "&#x002509;"],
        ["\\&lt;^bigskip&gt;", "&#x002501;"],
        ["\\&lt;^item&gt;", "&#x0025aa;"],
        ["\\&lt;^enum&gt;", "&#x0025b8;"],
        ["\\&lt;^descr&gt;", "&#x0027a7;"],
        ["\\&lt;^footnote&gt;", "&#x00204b;"],
        ["\\&lt;^verbatim&gt;", "&#x0025a9;"],
        ["\\&lt;^theory_text&gt;", "&#x002b1a;"],
        ["\\&lt;^emph&gt;", "&#x002217;"],
        ["\\&lt;^bold&gt;", "&#x002759;"],
        ["\\&lt;^sub&gt;", "&#x0021e9;"],
        ["\\&lt;^sup&gt;", "&#x0021e7;"],
        ["\\&lt;^bsub&gt;", "&#x0021d8;"],
        ["\\&lt;^esub&gt;", "&#x0021d9;"],
        ["\\&lt;^bsup&gt;", "&#x0021d7;"],
        ["\\&lt;^esup&gt;", "&#x0021d6;"],
        ["\\&lt;^file&gt;", "&#x01F5CF;"],
        ["\\&lt;^dir&gt;", "&#x01F5C0;"],
        ["\\&lt;^url&gt;", "&#x01F310;"],
        ["\\&lt;^doc&gt;", "&#x01F4D3;"],
        ["\\&lt;^action&gt;", "&#x00261b;"]
    ];

    var $ = window.jQuery;
    // Minor jquery helper
    $.fn.exists = function() {
        return this.length !== 0;
    }

    // We create hidden spans to stash the old text
    var origStashSpan = 'origIsabelleText';

    function replaceAll(text, find, repl) {
        while (text.indexOf(find) >= 0){
            text = text.replace(find, repl);}
        return text;
    }

    // update code containers
    function fix(cont) {
        // find each line, and process it
        cont.find("pre.CodeMirror-line").each(function(i, line) {
            if ($(line).find('span.' + origStashSpan).exists()) {
                // already processed -- skip it
                return;
            }
            var span = $(line).find('span[role="presentation"]'); // the lines seem to always have one span child.
            // get the HTML, do all replacements
            var origHtml = span.html();
            var newHtml = origHtml;
            for (var z=0; z<replaces.length; z++) {
                newHtml = replaceAll(newHtml, replaces[z][0], replaces[z][1]);
            }
            // stash the old HTML for unfix()
            $(line).append('<span class="' + origStashSpan + '" style="display:none"></span>')
            $(line).find('span.' + origStashSpan).html(origHtml);
            // now write the new HTML
            span.html(newHtml);
        });
    }

    // revert the update and restore the original text
    function unfix(cont) {
        // find each line, and process it
        cont.find("pre.CodeMirror-line").each(function(i, line) {
            var orig = $(line).find('span.' + origStashSpan);
            if (orig.exists()) {
                var span = $(line).find('span[role="presentation"]');
                span.html(orig.html());
                orig.remove();
            }
        });
    }

    // On load, start doing replaces every 0.2 seconds.
    // NB: this traverses the code DOM every time, but text replacement is cached.
    var refreshSpeed = 200;

    $(window).on('load', function() {
        // store setting here, so it persists even if buttons go away
        var enabled = true;
        // NB: we use class instead of ID, so that we can deal with
        //     multiple codeWindows in a single page (each will get one
        //     button, but they will all share the same enabled state).
        var uiButtons = 'button.isabelleSymbolsToggle';

        var waitForCode = setInterval(function() {
            // uncomment to stop after one run (for debugging)
            //clearInterval(waitForCode);

            var codeWindows = $('div.CodeMirror');
            var buttons = $(uiButtons);
            function updateLabels() {
                $(uiButtons).attr('aria-pressed', enabled? 'true' : 'false');
            }

            if (codeWindows.exists() && !buttons.exists()) {
                codeWindows.prepend('<button class="isabelleSymbolsToggle aui-button">Isabelle symbols</button>');
                updateLabels();
                $(uiButtons).on('click', function() {
                    enabled = !enabled;
                    updateLabels();
                    return false;
                });
            }

            var codeContainers = codeWindows.find('div.CodeMirror-lines');
            if (codeContainers.exists()) {
                if (enabled) {
                    fix(codeContainers);
                } else {
                    unfix(codeContainers);
                }
            }
        }, refreshSpeed);
    });
})();
