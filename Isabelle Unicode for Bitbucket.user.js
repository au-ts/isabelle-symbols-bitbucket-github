// ==UserScript==
// @name         Isabelle Unicode for Bitbucket
// @namespace    http://tampermonkey.net/
// @version      0.4.4
// @description  Replace isabelle symbol representations with unicode versions in bitbucket and github
// @author       Scott Buckley and Mitchell Buckley and Japheth Lim
// @match        https://github.com/*
// @match        https://bitbucket.org/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==




/*
  CHANGELOG
  v0.4.4 2023-10-25
  - remove support for ts internal bitbucket
  - add lblot and rblot to list of symbols to be replaced
  v0.4.3 2020-09-03
  - added format for public github's pr comment formatting 'public github - comment view'.
  - added this changelog
*/


(function() {
    'use strict';

    // String.fromCharCode properly handles unicode outside the BMP;
    // see https://stackoverflow.com/q/3744721 for explanation + polyfill
    var replaces = [
        ["\\<zero>", String.fromCharCode(0x01d7ec)],
        ["\\<one>", String.fromCharCode(0x01d7ed)],
        ["\\<two>", String.fromCharCode(0x01d7ee)],
        ["\\<three>", String.fromCharCode(0x01d7ef)],
        ["\\<four>", String.fromCharCode(0x01d7f0)],
        ["\\<five>", String.fromCharCode(0x01d7f1)],
        ["\\<six>", String.fromCharCode(0x01d7f2)],
        ["\\<seven>", String.fromCharCode(0x01d7f3)],
        ["\\<eight>", String.fromCharCode(0x01d7f4)],
        ["\\<nine>", String.fromCharCode(0x01d7f5)],
        ["\\<A>", String.fromCharCode(0x01d49c)],
        ["\\<B>", String.fromCharCode(0x00212c)],
        ["\\<C>", String.fromCharCode(0x01d49e)],
        ["\\<D>", String.fromCharCode(0x01d49f)],
        ["\\<E>", String.fromCharCode(0x002130)],
        ["\\<F>", String.fromCharCode(0x002131)],
        ["\\<G>", String.fromCharCode(0x01d4a2)],
        ["\\<H>", String.fromCharCode(0x00210b)],
        ["\\<I>", String.fromCharCode(0x002110)],
        ["\\<J>", String.fromCharCode(0x01d4a5)],
        ["\\<K>", String.fromCharCode(0x01d4a6)],
        ["\\<L>", String.fromCharCode(0x002112)],
        ["\\<M>", String.fromCharCode(0x002133)],
        ["\\<N>", String.fromCharCode(0x01d4a9)],
        ["\\<O>", String.fromCharCode(0x01d4aa)],
        ["\\<P>", String.fromCharCode(0x01d4ab)],
        ["\\<Q>", String.fromCharCode(0x01d4ac)],
        ["\\<R>", String.fromCharCode(0x00211b)],
        ["\\<S>", String.fromCharCode(0x01d4ae)],
        ["\\<T>", String.fromCharCode(0x01d4af)],
        ["\\<U>", String.fromCharCode(0x01d4b0)],
        ["\\<V>", String.fromCharCode(0x01d4b1)],
        ["\\<W>", String.fromCharCode(0x01d4b2)],
        ["\\<X>", String.fromCharCode(0x01d4b3)],
        ["\\<Y>", String.fromCharCode(0x01d4b4)],
        ["\\<Z>", String.fromCharCode(0x01d4b5)],
        ["\\<a>", String.fromCharCode(0x01d5ba)],
        ["\\<b>", String.fromCharCode(0x01d5bb)],
        ["\\<c>", String.fromCharCode(0x01d5bc)],
        ["\\<d>", String.fromCharCode(0x01d5bd)],
        ["\\<e>", String.fromCharCode(0x01d5be)],
        ["\\<f>", String.fromCharCode(0x01d5bf)],
        ["\\<g>", String.fromCharCode(0x01d5c0)],
        ["\\<h>", String.fromCharCode(0x01d5c1)],
        ["\\<i>", String.fromCharCode(0x01d5c2)],
        ["\\<j>", String.fromCharCode(0x01d5c3)],
        ["\\<k>", String.fromCharCode(0x01d5c4)],
        ["\\<l>", String.fromCharCode(0x01d5c5)],
        ["\\<m>", String.fromCharCode(0x01d5c6)],
        ["\\<n>", String.fromCharCode(0x01d5c7)],
        ["\\<o>", String.fromCharCode(0x01d5c8)],
        ["\\<p>", String.fromCharCode(0x01d5c9)],
        ["\\<q>", String.fromCharCode(0x01d5ca)],
        ["\\<r>", String.fromCharCode(0x01d5cb)],
        ["\\<s>", String.fromCharCode(0x01d5cc)],
        ["\\<t>", String.fromCharCode(0x01d5cd)],
        ["\\<u>", String.fromCharCode(0x01d5ce)],
        ["\\<v>", String.fromCharCode(0x01d5cf)],
        ["\\<w>", String.fromCharCode(0x01d5d0)],
        ["\\<x>", String.fromCharCode(0x01d5d1)],
        ["\\<y>", String.fromCharCode(0x01d5d2)],
        ["\\<z>", String.fromCharCode(0x01d5d3)],
        ["\\<AA>", String.fromCharCode(0x01d504)],
        ["\\<BB>", String.fromCharCode(0x01d505)],
        ["\\<CC>", String.fromCharCode(0x00212d)],
        ["\\<DD>", String.fromCharCode(0x01d507)],
        ["\\<EE>", String.fromCharCode(0x01d508)],
        ["\\<FF>", String.fromCharCode(0x01d509)],
        ["\\<GG>", String.fromCharCode(0x01d50a)],
        ["\\<HH>", String.fromCharCode(0x00210c)],
        ["\\<II>", String.fromCharCode(0x002111)],
        ["\\<JJ>", String.fromCharCode(0x01d50d)],
        ["\\<KK>", String.fromCharCode(0x01d50e)],
        ["\\<LL>", String.fromCharCode(0x01d50f)],
        ["\\<MM>", String.fromCharCode(0x01d510)],
        ["\\<NN>", String.fromCharCode(0x01d511)],
        ["\\<OO>", String.fromCharCode(0x01d512)],
        ["\\<PP>", String.fromCharCode(0x01d513)],
        ["\\<QQ>", String.fromCharCode(0x01d514)],
        ["\\<RR>", String.fromCharCode(0x00211c)],
        ["\\<SS>", String.fromCharCode(0x01d516)],
        ["\\<TT>", String.fromCharCode(0x01d517)],
        ["\\<UU>", String.fromCharCode(0x01d518)],
        ["\\<VV>", String.fromCharCode(0x01d519)],
        ["\\<WW>", String.fromCharCode(0x01d51a)],
        ["\\<XX>", String.fromCharCode(0x01d51b)],
        ["\\<YY>", String.fromCharCode(0x01d51c)],
        ["\\<ZZ>", String.fromCharCode(0x002128)],
        ["\\<aa>", String.fromCharCode(0x01d51e)],
        ["\\<bb>", String.fromCharCode(0x01d51f)],
        ["\\<cc>", String.fromCharCode(0x01d520)],
        ["\\<dd>", String.fromCharCode(0x01d521)],
        ["\\<ee>", String.fromCharCode(0x01d522)],
        ["\\<ff>", String.fromCharCode(0x01d523)],
        ["\\<gg>", String.fromCharCode(0x01d524)],
        ["\\<hh>", String.fromCharCode(0x01d525)],
        ["\\<ii>", String.fromCharCode(0x01d526)],
        ["\\<jj>", String.fromCharCode(0x01d527)],
        ["\\<kk>", String.fromCharCode(0x01d528)],
        ["\\<ll>", String.fromCharCode(0x01d529)],
        ["\\<mm>", String.fromCharCode(0x01d52a)],
        ["\\<nn>", String.fromCharCode(0x01d52b)],
        ["\\<oo>", String.fromCharCode(0x01d52c)],
        ["\\<pp>", String.fromCharCode(0x01d52d)],
        ["\\<qq>", String.fromCharCode(0x01d52e)],
        ["\\<rr>", String.fromCharCode(0x01d52f)],
        ["\\<ss>", String.fromCharCode(0x01d530)],
        ["\\<tt>", String.fromCharCode(0x01d531)],
        ["\\<uu>", String.fromCharCode(0x01d532)],
        ["\\<vv>", String.fromCharCode(0x01d533)],
        ["\\<ww>", String.fromCharCode(0x01d534)],
        ["\\<xx>", String.fromCharCode(0x01d535)],
        ["\\<yy>", String.fromCharCode(0x01d536)],
        ["\\<zz>", String.fromCharCode(0x01d537)],
        ["\\<alpha>", String.fromCharCode(0x0003b1)],
        ["\\<beta>", String.fromCharCode(0x0003b2)],
        ["\\<gamma>", String.fromCharCode(0x0003b3)],
        ["\\<delta>", String.fromCharCode(0x0003b4)],
        ["\\<epsilon>", String.fromCharCode(0x0003b5)],
        ["\\<zeta>", String.fromCharCode(0x0003b6)],
        ["\\<eta>", String.fromCharCode(0x0003b7)],
        ["\\<theta>", String.fromCharCode(0x0003b8)],
        ["\\<iota>", String.fromCharCode(0x0003b9)],
        ["\\<kappa>", String.fromCharCode(0x0003ba)],
        ["\\<lambda>", String.fromCharCode(0x0003bb)],
        ["\\<mu>", String.fromCharCode(0x0003bc)],
        ["\\<nu>", String.fromCharCode(0x0003bd)],
        ["\\<xi>", String.fromCharCode(0x0003be)],
        ["\\<pi>", String.fromCharCode(0x0003c0)],
        ["\\<rho>", String.fromCharCode(0x0003c1)],
        ["\\<sigma>", String.fromCharCode(0x0003c3)],
        ["\\<tau>", String.fromCharCode(0x0003c4)],
        ["\\<upsilon>", String.fromCharCode(0x0003c5)],
        ["\\<phi>", String.fromCharCode(0x0003c6)],
        ["\\<chi>", String.fromCharCode(0x0003c7)],
        ["\\<psi>", String.fromCharCode(0x0003c8)],
        ["\\<omega>", String.fromCharCode(0x0003c9)],
        ["\\<Gamma>", String.fromCharCode(0x000393)],
        ["\\<Delta>", String.fromCharCode(0x000394)],
        ["\\<Theta>", String.fromCharCode(0x000398)],
        ["\\<Lambda>", String.fromCharCode(0x00039b)],
        ["\\<Xi>", String.fromCharCode(0x00039e)],
        ["\\<Pi>", String.fromCharCode(0x0003a0)],
        ["\\<Sigma>", String.fromCharCode(0x0003a3)],
        ["\\<Upsilon>", String.fromCharCode(0x0003a5)],
        ["\\<Phi>", String.fromCharCode(0x0003a6)],
        ["\\<Psi>", String.fromCharCode(0x0003a8)],
        ["\\<Omega>", String.fromCharCode(0x0003a9)],
        ["\\<bool>", String.fromCharCode(0x01d539)],
        ["\\<complex>", String.fromCharCode(0x002102)],
        ["\\<nat>", String.fromCharCode(0x002115)],
        ["\\<rat>", String.fromCharCode(0x00211a)],
        ["\\<real>", String.fromCharCode(0x00211d)],
        ["\\<int>", String.fromCharCode(0x002124)],
        ["\\<leftarrow>", String.fromCharCode(0x002190)],
        ["\\<longleftarrow>", String.fromCharCode(0x0027f5)],
        ["\\<longlongleftarrow>", String.fromCharCode(0x00290e)],
        ["\\<longlonglongleftarrow", " 0x0021e;"],
        ["\\<rightarrow>", String.fromCharCode(0x002192)],
        ["\\<longrightarrow>", String.fromCharCode(0x0027f6)],
        ["\\<longlongrightarrow>", String.fromCharCode(0x00290f)],
        ["\\<longlonglongrightarrow>", String.fromCharCode(0x0021e2)],
        ["\\<Leftarrow>", String.fromCharCode(0x0021d0)],
        ["\\<Longleftarrow>", String.fromCharCode(0x0027f8)],
        ["\\<Lleftarrow>", String.fromCharCode(0x0021da)],
        ["\\<Rightarrow>", String.fromCharCode(0x0021d2)],
        ["\\<Longrightarrow>", String.fromCharCode(0x0027f9)],
        ["\\<Rrightarrow>", String.fromCharCode(0x0021db)],
        ["\\<leftrightarrow>", String.fromCharCode(0x002194)],
        ["\\<longleftrightarrow>", String.fromCharCode(0x0027f7)],
        ["\\<Leftrightarrow>", String.fromCharCode(0x0021d4)],
        ["\\<Longleftrightarrow>", String.fromCharCode(0x0027fa)],
        ["\\<mapsto>", String.fromCharCode(0x0021a6)],
        ["\\<longmapsto>", String.fromCharCode(0x0027fc)],
        ["\\<midarrow>", String.fromCharCode(0x002500)],
        ["\\<Midarrow>", String.fromCharCode(0x002550)],
        ["\\<hookleftarrow>", String.fromCharCode(0x0021a9)],
        ["\\<hookrightarrow>", String.fromCharCode(0x0021aa)],
        ["\\<leftharpoondown>", String.fromCharCode(0x0021bd)],
        ["\\<rightharpoondown>", String.fromCharCode(0x0021c1)],
        ["\\<leftharpoonup>", String.fromCharCode(0x0021bc)],
        ["\\<rightharpoonup>", String.fromCharCode(0x0021c0)],
        ["\\<rightleftharpoons>", String.fromCharCode(0x0021cc)],
        ["\\<leadsto>", String.fromCharCode(0x00219d)],
        ["\\<downharpoonleft>", String.fromCharCode(0x0021c3)],
        ["\\<downharpoonright>", String.fromCharCode(0x0021c2)],
        ["\\<upharpoonleft>", String.fromCharCode(0x0021bf)],
        ["\\<upharpoonright>", String.fromCharCode(0x0021be)],
        ["\\<restriction>", String.fromCharCode(0x0021be)],
        ["\\<Colon>", String.fromCharCode(0x002237)],
        ["\\<up>", String.fromCharCode(0x002191)],
        ["\\<Up>", String.fromCharCode(0x0021d1)],
        ["\\<down>", String.fromCharCode(0x002193)],
        ["\\<Down>", String.fromCharCode(0x0021d3)],
        ["\\<updown>", String.fromCharCode(0x002195)],
        ["\\<Updown>", String.fromCharCode(0x0021d5)],
        ["\\<langle>", String.fromCharCode(0x0027e8)],
        ["\\<rangle>", String.fromCharCode(0x0027e9)],
        ["\\<lceil>", String.fromCharCode(0x002308)],
        ["\\<rceil>", String.fromCharCode(0x002309)],
        ["\\<lfloor>", String.fromCharCode(0x00230a)],
        ["\\<rfloor>", String.fromCharCode(0x00230b)],
        ["\\<lparr>", String.fromCharCode(0x002987)],
        ["\\<rparr>", String.fromCharCode(0x002988)],
        ["\\<lbrakk>", String.fromCharCode(0x0027e6)],
        ["\\<rbrakk>", String.fromCharCode(0x0027e7)],
        ["\\<lbrace>", String.fromCharCode(0x002983)],
        ["\\<rbrace>", String.fromCharCode(0x002984)],
        ["\\<lblot>", String.fromCharCode(0x002989)],
        ["\\<rblot>", String.fromCharCode(0x00298a)],
        ["\\<guillemotleft>", String.fromCharCode(0x0000ab)],
        ["\\<guillemotright>", String.fromCharCode(0x0000bb)],
        ["\\<bottom>", String.fromCharCode(0x0022a5)],
        ["\\<top>", String.fromCharCode(0x0022a4)],
        ["\\<and>", String.fromCharCode(0x002227)],
        ["\\<And>", String.fromCharCode(0x0022c0)],
        ["\\<or>", String.fromCharCode(0x002228)],
        ["\\<Or>", String.fromCharCode(0x0022c1)],
        ["\\<forall>", String.fromCharCode(0x002200)],
        ["\\<exists>", String.fromCharCode(0x002203)],
        ["\\<nexists>", String.fromCharCode(0x002204)],
        ["\\<not>", String.fromCharCode(0x0000ac)],
        ["\\<circle>", String.fromCharCode(0x0025cb)],
        ["\\<box>", String.fromCharCode(0x0025a1)],
        ["\\<diamond>", String.fromCharCode(0x0025c7)],
        ["\\<diamondop>", String.fromCharCode(0x0022c4)],
        ["\\<turnstile>", String.fromCharCode(0x0022a2)],
        ["\\<Turnstile>", String.fromCharCode(0x0022a8)],
        ["\\<tturnstile>", String.fromCharCode(0x0022a9)],
        ["\\<TTurnstile>", String.fromCharCode(0x0022ab)],
        ["\\<stileturn>", String.fromCharCode(0x0022a3)],
        ["\\<surd>", String.fromCharCode(0x00221a)],
        ["\\<le>", String.fromCharCode(0x002264)],
        ["\\<ge>", String.fromCharCode(0x002265)],
        ["\\<lless>", String.fromCharCode(0x00226a)],
        ["\\<ggreater>", String.fromCharCode(0x00226b)],
        ["\\<lesssim>", String.fromCharCode(0x002272)],
        ["\\<greatersim>", String.fromCharCode(0x002273)],
        ["\\<lessapprox>", String.fromCharCode(0x002a85)],
        ["\\<greaterapprox>", String.fromCharCode(0x002a86)],
        ["\\<in>", String.fromCharCode(0x002208)],
        ["\\<notin>", String.fromCharCode(0x002209)],
        ["\\<subset>", String.fromCharCode(0x002282)],
        ["\\<supset>", String.fromCharCode(0x002283)],
        ["\\<subseteq>", String.fromCharCode(0x002286)],
        ["\\<supseteq>", String.fromCharCode(0x002287)],
        ["\\<sqsubset>", String.fromCharCode(0x00228f)],
        ["\\<sqsupset>", String.fromCharCode(0x002290)],
        ["\\<sqsubseteq>", String.fromCharCode(0x002291)],
        ["\\<sqsupseteq>", String.fromCharCode(0x002292)],
        ["\\<inter>", String.fromCharCode(0x002229)],
        ["\\<Inter>", String.fromCharCode(0x0022c2)],
        ["\\<union>", String.fromCharCode(0x00222a)],
        ["\\<Union>", String.fromCharCode(0x0022c3)],
        ["\\<squnion>", String.fromCharCode(0x002294)],
        ["\\<Squnion>", String.fromCharCode(0x002a06)],
        ["\\<sqinter>", String.fromCharCode(0x002293)],
        ["\\<Sqinter>", String.fromCharCode(0x002a05)],
        ["\\<setminus>", String.fromCharCode(0x002216)],
        ["\\<propto>", String.fromCharCode(0x00221d)],
        ["\\<uplus>", String.fromCharCode(0x00228e)],
        ["\\<Uplus>", String.fromCharCode(0x002a04)],
        ["\\<noteq>", String.fromCharCode(0x002260)],
        ["\\<sim>", String.fromCharCode(0x00223c)],
        ["\\<doteq>", String.fromCharCode(0x002250)],
        ["\\<simeq>", String.fromCharCode(0x002243)],
        ["\\<approx>", String.fromCharCode(0x002248)],
        ["\\<asymp>", String.fromCharCode(0x00224d)],
        ["\\<cong>", String.fromCharCode(0x002245)],
        ["\\<smile>", String.fromCharCode(0x002323)],
        ["\\<equiv>", String.fromCharCode(0x002261)],
        ["\\<frown>", String.fromCharCode(0x002322)],
        ["\\<Join>", String.fromCharCode(0x0022c8)],
        ["\\<bowtie>", String.fromCharCode(0x002a1d)],
        ["\\<prec>", String.fromCharCode(0x00227a)],
        ["\\<succ>", String.fromCharCode(0x00227b)],
        ["\\<preceq>", String.fromCharCode(0x00227c)],
        ["\\<succeq>", String.fromCharCode(0x00227d)],
        ["\\<parallel>", String.fromCharCode(0x002225)],
        ["\\<bar>", String.fromCharCode(0x0000a6)],
        ["\\<plusminus>", String.fromCharCode(0x0000b1)],
        ["\\<minusplus>", String.fromCharCode(0x002213)],
        ["\\<times>", String.fromCharCode(0x0000d7)],
        ["\\<div>", String.fromCharCode(0x0000f7)],
        ["\\<cdot>", String.fromCharCode(0x0022c5)],
        ["\\<star>", String.fromCharCode(0x0022c6)],
        ["\\<bullet>", String.fromCharCode(0x002219)],
        ["\\<circ>", String.fromCharCode(0x002218)],
        ["\\<dagger>", String.fromCharCode(0x002020)],
        ["\\<ddagger>", String.fromCharCode(0x002021)],
        ["\\<lhd>", String.fromCharCode(0x0022b2)],
        ["\\<rhd>", String.fromCharCode(0x0022b3)],
        ["\\<unlhd>", String.fromCharCode(0x0022b4)],
        ["\\<unrhd>", String.fromCharCode(0x0022b5)],
        ["\\<triangleleft>", String.fromCharCode(0x0025c3)],
        ["\\<triangleright>", String.fromCharCode(0x0025b9)],
        ["\\<triangle>", String.fromCharCode(0x0025b3)],
        ["\\<triangleq>", String.fromCharCode(0x00225c)],
        ["\\<oplus>", String.fromCharCode(0x002295)],
        ["\\<Oplus>", String.fromCharCode(0x002a01)],
        ["\\<otimes>", String.fromCharCode(0x002297)],
        ["\\<Otimes>", String.fromCharCode(0x002a02)],
        ["\\<odot>", String.fromCharCode(0x002299)],
        ["\\<Odot>", String.fromCharCode(0x002a00)],
        ["\\<ominus>", String.fromCharCode(0x002296)],
        ["\\<oslash>", String.fromCharCode(0x002298)],
        ["\\<dots>", String.fromCharCode(0x002026)],
        ["\\<cdots>", String.fromCharCode(0x0022ef)],
        ["\\<Sum>", String.fromCharCode(0x002211)],
        ["\\<Prod>", String.fromCharCode(0x00220f)],
        ["\\<Coprod>", String.fromCharCode(0x002210)],
        ["\\<infinity>", String.fromCharCode(0x00221e)],
        ["\\<integral>", String.fromCharCode(0x00222b)],
        ["\\<ointegral>", String.fromCharCode(0x00222e)],
        ["\\<clubsuit>", String.fromCharCode(0x002663)],
        ["\\<diamondsuit>", String.fromCharCode(0x002662)],
        ["\\<heartsuit>", String.fromCharCode(0x002661)],
        ["\\<spadesuit>", String.fromCharCode(0x002660)],
        ["\\<aleph>", String.fromCharCode(0x002135)],
        ["\\<emptyset>", String.fromCharCode(0x002205)],
        ["\\<nabla>", String.fromCharCode(0x002207)],
        ["\\<partial>", String.fromCharCode(0x002202)],
        ["\\<flat>", String.fromCharCode(0x00266d)],
        ["\\<natural>", String.fromCharCode(0x00266e)],
        ["\\<sharp>", String.fromCharCode(0x00266f)],
        ["\\<angle>", String.fromCharCode(0x002220)],
        ["\\<copyright>", String.fromCharCode(0x0000a9)],
        ["\\<registered>", String.fromCharCode(0x0000ae)],
        ["\\<hyphen>", String.fromCharCode(0x002010)],
        ["\\<inverse>", String.fromCharCode(0x0000af)],
        ["\\<onequarter>", String.fromCharCode(0x0000bc)],
        ["\\<onehalf>", String.fromCharCode(0x0000bd)],
        ["\\<threequarters>", String.fromCharCode(0x0000be)],
        ["\\<ordfeminine>", String.fromCharCode(0x0000aa)],
        ["\\<ordmasculine>", String.fromCharCode(0x0000ba)],
        ["\\<section>", String.fromCharCode(0x0000a7)],
        ["\\<paragraph>", String.fromCharCode(0x0000b6)],
        ["\\<exclamdown>", String.fromCharCode(0x0000a1)],
        ["\\<questiondown>", String.fromCharCode(0x0000bf)],
        ["\\<euro>", String.fromCharCode(0x0020ac)],
        ["\\<pounds>", String.fromCharCode(0x0000a3)],
        ["\\<yen>", String.fromCharCode(0x0000a5)],
        ["\\<cent>", String.fromCharCode(0x0000a2)],
        ["\\<currency>", String.fromCharCode(0x0000a4)],
        ["\\<degree>", String.fromCharCode(0x0000b0)],
        ["\\<amalg>", String.fromCharCode(0x002a3f)],
        ["\\<mho>", String.fromCharCode(0x002127)],
        ["\\<lozenge>", String.fromCharCode(0x0025ca)],
        ["\\<wp>", String.fromCharCode(0x002118)],
        ["\\<wrong>", String.fromCharCode(0x002240)],
        ["\\<acute>", String.fromCharCode(0x0000b4)],
        ["\\<index>", String.fromCharCode(0x000131)],
        ["\\<dieresis>", String.fromCharCode(0x0000a8)],
        ["\\<cedilla>", String.fromCharCode(0x0000b8)],
        ["\\<hungarumlaut>", String.fromCharCode(0x0002dd)],
        ["\\<bind>", String.fromCharCode(0x00291c)],
        ["\\<then>", String.fromCharCode(0x002aa2)],
        ["\\<some>", String.fromCharCode(0x0003f5)],
        ["\\<hole>", String.fromCharCode(0x002311)],
        ["\\<newline>", String.fromCharCode(0x0023ce)],
        ["\\<comment>", String.fromCharCode(0x002015)],
        ["\\<^cancel>", String.fromCharCode(0x002326)],
        ["\\<open>", String.fromCharCode(0x002039)],
        ["\\<close>", String.fromCharCode(0x00203a)],
        ["\\<^here>", String.fromCharCode(0x002302)],
        ["\\<^undefined>", String.fromCharCode(0x002756)],
        ["\\<^noindent>", String.fromCharCode(0x0021e4)],
        ["\\<^smallskip>", String.fromCharCode(0x002508)],
        ["\\<^medskip>", String.fromCharCode(0x002509)],
        ["\\<^bigskip>", String.fromCharCode(0x002501)],
        ["\\<^item>", String.fromCharCode(0x0025aa)],
        ["\\<^enum>", String.fromCharCode(0x0025b8)],
        ["\\<^descr>", String.fromCharCode(0x0027a7)],
        ["\\<^footnote>", String.fromCharCode(0x00204b)],
        ["\\<^verbatim>", String.fromCharCode(0x0025a9)],
        ["\\<^theory_text>", String.fromCharCode(0x002b1a)],
        ["\\<^emph>", String.fromCharCode(0x002217)],
        ["\\<^bold>", String.fromCharCode(0x002759)],
        ["\\<^sub>", String.fromCharCode(0x0021e9)],
        ["\\<^sup>", String.fromCharCode(0x0021e7)],
        ["\\<^bsub>", String.fromCharCode(0x0021d8)],
        ["\\<^esub>", String.fromCharCode(0x0021d9)],
        ["\\<^bsup>", String.fromCharCode(0x0021d7)],
        ["\\<^esup>", String.fromCharCode(0x0021d6)],
        ["\\<^file>", String.fromCharCode(0x01F5CF)],
        ["\\<^dir>", String.fromCharCode(0x01F5C0)],
        ["\\<^url>", String.fromCharCode(0x01F310)],
        ["\\<^doc>", String.fromCharCode(0x01F4D3)],
        ["\\<^action>", String.fromCharCode(0x00261b)],
    ];

    var fastPrefix = '\\<';
    var translateKeys = [];
    var translateMap = [];
    var regexMatchString = ""
    for (var z=0; z<replaces.length; z++) {
        var key = replaces[z][0];
        translateKeys.push(key);
        translateMap[key] = replaces[z][1];
        if (!key.startsWith(fastPrefix)) {
            fastPrefix = '';
        }
    }
    RegExp.escape= function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var translateRegexp = new RegExp(translateKeys.map(RegExp.escape).join("|"), "g");
    var translateFunc = function(x) {
        var out = translateMap[x];
        if (out) return out;
        return x;
    }
    var translateReplace = function(str) {
        if (str.indexOf(fastPrefix)===-1) return str;
        return str.replace(translateRegexp, translateFunc);
    }

    if (!fastPrefix) {
        //unsafeWindow.console.error('Isabelle Unicode for Bitbucket: fastPrefix failed');
        return;
    }

    var $ = window.jQuery;
    // Minor jquery helper
    $.fn.exists = function() {
        return this.length !== 0;
    }

    // We create hidden spans to stash the old text
    var origStashSpan = 'origIsabelleText';


    // isabelle code is shown in a bunch of different ways on different websites in different modes.
    // this grouping of attributes attempts to generalise the process of identifying an isabelle file
    // and handling each displayed file and line of code with its replacements.
    //
    // 'human_desc'     not used (except for debug outputs)
    // 'last_tested'    not used. should be updated when each format is tested.
    // 'file_window'    is a jQuery selector string OR a function (the others are just selectors) for identifying an element
    //                  that represents an isabelle file on the page.
    // 'code_window'    (selector) is the part of file_window that contains the code. this is where the button will be added.
    // 'code_container' (selector) is the element that contain code lines
    // 'code_line'      (selector) is each individual line of code (including wrapper stuff)
    // 'line_textspan'  (selector) is the smallest span that contains all of the code text
    //
    // 'text_has_epilogue', if true, treats a line differently for replacement, as there is a non-text epilogue
    //                      inside the line_textspan. this makes replacement more tricky. the epilogue (must be the
    //                      last node) is matched with 'epilogue_sel'. This is mostly custom-made for one particular format,
    //                      but could theoretically be used more generally.
    var formats = [
        {
          human_desc:     'public github - source view',
          last_tested:    '2020-04-14',
          file_window:    'div.repository-content:has(.breadcrumb:contains(".thy"))',
          code_window:    'div.type-isabelle',
          code_container: 'table.js-file-line-container',
          code_line:      'tr',
          line_textspan:  'td.js-file-line',
        },
        {
          human_desc:     'public github - diff view',
          last_tested:    '2023-10-25',
          file_window:    'div.js-file:has(div.file-info:has(a:contains(".thy")))',
          code_window:    'div.js-file-content',
          code_container: 'table.diff-table',
          code_line:      'td.blob-code',
          line_textspan:  'span.blob-code-inner',
        },
        {
          human_desc:     'public github - comment view',
          last_tested:    '2023-10-25',
          file_window:    'details.js-comment-container:has(a:contains(".thy"))',
          code_window:    'div.blob-wrapper',
          code_container: 'table.diff-table',
          code_line:      'td.blob-code',
          line_textspan:  'span.blob-code-inner',
        },
        { // ugh all the css names seem like generated garbage. maybe they're trying to stop exactly this
          human_desc:     'public bitbucket - source view',
          last_tested:    '2020-04-14',
          file_window: function() {
              return $('div[data-qa=bk-file__header]:has(span:contains(".thy"))').parent();
          },
          code_window:    'div.monaco-editor',
          code_container: 'div.lines-content',
          code_line:      'div.view-line',
          line_textspan:  'span',
        },
        {
          human_desc:     'public bitbucket - diff view',
          last_tested:    '2020-04-14',
          file_window:    'div.diff-container:has(h1.filename:contains(".thy"))',
          code_window:    'div.diff-content-container',
          code_container: 'div.refract-content-container',
          code_line:      'div.udiff-line',
          line_textspan:  'pre.source',
        },
    ];

    function getCodeFormatIndex() {
        // return an index from "formats", or -1 if this is not recognised
        // as an isabelle file anywhere
        for (var f=0; f<formats.length; f++) {
            if (getFileWindow(formats[f]).exists()) {
                //console.log(formats[f]);
                return f;
            }
        }
        return -1;
    }

    function getFileWindow(format) {
        if (typeof format.file_window === "function") return format.file_window();
        return $(format.file_window);
    }

    // The ugly and slow DOM/string wrangling.
    // `line`: container (i.e. $('.CodeMirror-line'))
    // `span`: span for the code within `line`
    // (These should be elements, not jquery selectors)
    function doReplace(line, format) {
        var span;
        var htmlNodes;
        var pendingText;
        var stashHTML;
        var jline = $(line);

        if (format.text_has_epilogue !== true) {
            // the 'normal' case
            span = $(line).find(format.line_textspan);
            if (!span.exists()) return;
            span = span.get(0); // this should only be one line, and we want its top-level container
            htmlNodes = span.childNodes;
            pendingText = span.innerText;
            stashHTML = $(span).html();
        } else {
            span = line;
            if (jline.find(format.epilogue_sel).exists()) {
                // htmlNodes are the childNodes excluding the last one (the epilogue)
                htmlNodes = Array.prototype.slice.call(span.childNodes, 0, -1);

                // we want the text EXCLUDING the epilogue
                var commentsText = span.childNodes[span.childNodes.length-1].innerText;
                pendingText = span.innerText;
                if (commentsText.length !== 0)
                    pendingText = pendingText.substr(0, pendingText.length-commentsText.length-1);

                var clone = jline.clone();
                clone.find(format.epilogue_sel).remove();
                stashHTML = clone.html();
            } else {
                htmlNodes = span.childNodes;
                pendingText = span.innerText;
                stashHTML = $(span).html();
            }
        }


        // the actual text replace process. we recurse through all nodes
        // (starting with htmlNodes), replacing the text of any text Node,
        // and recursing into non-text nodes.
        // the function 'translateReplace' does the direct string replacing work.
        var recurseReplace = function(nodes) {
            for (var i=0; i<nodes.length; i++) {
                var node = nodes[i];
                if (node.nodeType === Node.ELEMENT_NODE) {
                    recurseReplace(node.childNodes);
                } else {
                    node.textContent = translateReplace(node.textContent);
                }
            }
        }
        recurseReplace(htmlNodes);


        // Stash the old HTML for unfix()
        var stash = $('<span class="' + origStashSpan + '" style="display:none">' + stashHTML + '</span>');
        jline.append(stash);
    }



    // update a code container
    function fix(cont, format) {
        // find each line, and process it
        cont.find(format.code_line).each(function(i, line) {
            if ($(line).find('span.' + origStashSpan).exists()) {
                // already processed -- skip it
                return;
            }
            doReplace(line, format);
        });
    }

    function restoreText(line, html, format) {
        if (format.text_has_epilogue !== true) {
            var span = $(line).find(format.line_textspan);
            span.html(html);
        } else {
            var jline = $(line);
            if (jline.find(format.epilogue_sel).exists()) {
                jline.contents().filter(function(){return !$(this).is(format.epilogue_sel)}).remove();
                jline.prepend(html);
            } else {
                jline.html(html);
            }
        }
    }

    // revert the update and restore the original text
    function unfix(cont, format) {

        // find each line, and process it
        cont.find(format.code_line).filter(':has(span.'+origStashSpan+')').each(function(i, line) {
            var orig = $(line).find('span.'+origStashSpan);
            if (orig.exists()) {
                restoreText(line, orig.html(), format);
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
            //if (window.stopnow) return;
            // clearInterval(waitForCode);

            // figure out which format we are dealing with (if any)
            var formatInd = getCodeFormatIndex();
            if (formatInd===-1) return;
            var format = formats[formatInd]

            // grab the elements we will be using
            var fileWindows = getFileWindow(format);
            var codeWindows = fileWindows.find(format.code_window);

            // unsafeWindow.console.log("found. format:" + format.human_desc);

            // set up buttons
            var buttons = $(uiButtons);
            function updateLabels() {
                var btn = $(uiButtons);
                btn.attr('aria-pressed', enabled? 'true' : 'false');
                btn.attr('aria-selected', enabled? 'true' : 'false');
                btn.text((enabled?'':'!')+"Isabelle symbols");
            }
            if (codeWindows.exists() && !buttons.exists()) {
                codeWindows.prepend('<button type="button" class="isabelleSymbolsToggle aui-button btn">Isabelle symbols</button>');
                updateLabels();
                $(uiButtons).on('click', function() {
                    enabled = !enabled;
                    updateLabels();
                    return false;
                });
            }

            // fix all the code lines
            var codeContainers = codeWindows.find(format.code_container);
            if (codeContainers.exists()) {
                if (enabled) {
                    fix(codeContainers, format);
                } else {
                    unfix(codeContainers, format);
                    window.stopnow = true;
                }
            }
        }, refreshSpeed);
    });
})();
