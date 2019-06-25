// ==UserScript==
// @name         Isabelle Unicode for Bitbucket
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  Replace isabelle symbol representations with unicode versions in bitbucket
// @author       Scott Buckley and Mitchell Buckley
// @match        https://bitbucket.ts.data61.csiro.au/*
// @match        http://pubg.buck.ly/test/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

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
    for (var z=0; z<replaces.length; z++) {
        if (!replaces[z][0].startsWith(fastPrefix)) {
            fastPrefix = '';
        }
    }
    if (!fastPrefix) {
        console.error('Isabelle Unicode for Bitbucket: fastPrefix failed');
        return;
    }

    var $ = window.jQuery;
    // Minor jquery helper
    $.fn.exists = function() {
        return this.length !== 0;
    }

    // We create hidden spans to stash the old text
    var origStashSpan = 'origIsabelleText';

    // The ugly and slow DOM/string wrangling.
    // `line`: container (i.e. $('.CodeMirror-line'))
    // `span`: span for the code within `line`
    // (These should be elements, not jquery selectors)
    function doReplace(line, span) {
        // Some parts of the diff may be highlighted with spans.
        // If they cross symbol boundaries, we want to move the new
        // text around to fit the existing spans.
        var htmlNodes = span.childNodes;

        // Traverse text and HTML in sync.
        var pendingText = span.innerText;
        var pendingNodes = [];
        var pendingIsSpan = [];
        for (var z=0; z<htmlNodes.length; z++) {
            // There should be only one level of spans, so using
            // textContent directly is OK.
            pendingNodes.push(htmlNodes[z].textContent);
            pendingIsSpan.push(htmlNodes[z].nodeType === Node.ELEMENT_NODE);
        }

        //uncomment these to flood your console and crash your browser process
        //console.log(pendingText, pendingNodes);

        // Start replacing from the beginning of the line.
        var newNodeText = ['']; // This will store new text for each node in htmlNodes
        while (pendingText !== '') {
            // if we didn't find anything, drop first char and continue.
            var oldPrefix = pendingText.substr(0, 1);
            var newPrefix = pendingText.substr(0, 1);
            var newSuffix = pendingText.substr(1);

            // Optimisation: only consider things that look like Isabelle symbols
            if (fastPrefix && pendingText.startsWith(fastPrefix)) {
                // FIXME: do this matching faster
                for (var z=0; z<replaces.length; z++) {
                    var find = replaces[z][0];
                    var repl = replaces[z][1];
                    if (pendingText.startsWith(find)) {
                        oldPrefix = find;
                        newPrefix = repl;
                        newSuffix = pendingText.substr(find.length);
                        break;
                    }
                }
            }
            //console.log({old: oldPrefix, newP: newPrefix});

            // If the replacement crosses at least one span, stuff the new text there.
            // This is a heuristic for the common case, where diffs look like
            //
            //   -  foo \\<[and]> bar
            //   +  foo \\<[or]> bar
            //
            // ("[...]" denotes highlight spans). We want to stretch the highlighting
            // to cover the whole symbol in both diff lines.
            var chars = oldPrefix.length;
            while (chars > 0) {
                if (chars > pendingNodes[0].length) {
                    if (newPrefix !== '' && !pendingIsSpan[0] && pendingIsSpan[1]) {
                        // Crosses span at index 1

                        // Drop text node 0
                        chars -= pendingNodes[0].length;
                        pendingNodes.shift();
                        pendingIsSpan.shift();

                        // Update span node 1
                        newNodeText.push(newPrefix);
                        newPrefix = '';
                    } else {
                        // Crosses span at index 0, update it
                        newNodeText[newNodeText.length-1] += newPrefix;
                        newPrefix = '';

                        // Drop span node 0
                        chars -= pendingNodes[0].length;
                        pendingNodes.shift();
                        pendingIsSpan.shift();
                        newNodeText.push('');
                    }
                } else {
                    // Doesn't cross a node; update current node
                    newNodeText[newNodeText.length-1] += newPrefix;
                    newPrefix = '';
                    pendingNodes[0] = pendingNodes[0].substr(chars);
                    chars = 0;
                    if (pendingNodes[0] === '') {
                        pendingNodes.shift();
                        pendingIsSpan.shift();
                        newNodeText.push('');
                    }
                }
                //console.log('  replacing:', {newPrefix, pendingNodes, newNodeText});
            }

            // Continue replacing
            pendingText = newSuffix;
            //console.log('  step:', pendingText, pendingNodes, newNodeText);
        }

        // Stash the old HTML for unfix()
        $(line).append('<span class="' + origStashSpan + '" style="display:none"></span>')
        $(line).find('span.' + origStashSpan).html($(span).html());

        // Now update HTML nodes with our new code
        for (var z=0; z<htmlNodes.length; z++) {
            htmlNodes[z].textContent = newNodeText[z];
        }
    }

    // update a code container
    function fix(cont) {
        // find each line, and process it
        cont.find("pre.CodeMirror-line").each(function(i, line) {
            if ($(line).find('span.' + origStashSpan).exists()) {
                // already processed -- skip it
                return;
            }
            var span = $(line).find('span[role="presentation"]'); // the lines seem to always have one span child.
            if (span.exists()) {
                doReplace(line, span.get(0));
            }
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

            // Only match file views with .thy filename in top bar. Two cases:
            var fileWindows
            var codeWindows
            if ($('div.file-content:has(.stub)').exists()) {
                // 1. Diffs, PRs, etc. (filename(s) at top of file-content box(es))
                fileWindows = $('div.file-content:has(.stub:contains(".thy"))');
                codeWindows = fileWindows.find('div.CodeMirror');
            } else {
                // 2. Source view (filename at top of page content)
                fileWindows = $('.aui-page-panel-content:has(.stub:contains(".thy"))');
                codeWindows = fileWindows.find('div.CodeMirror');
            }

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
