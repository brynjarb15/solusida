# Read me


Þetta er verkefni sem við gerðum í áfanganum Vefforritun II á vorönn 2017 í Háskólanum í Reykjavík

## Forritið keyrt
Þegar keyra á forritið þarf að hafa Node.js í tölvunni. Þá þarf að opna command prompt glugga og ná í nauðsynlega pakka. Það er gert með því að keyra eftirfarandi skipun bæðí inn í möppu sem heitir client og í möppu sem heitir server:

* npm install

Þá þarf að fara inn í server möppuna og gera skipunina:

* node index.js


Þar á eftir þarf að opna annan command prompt glugga og keyra eftirfarandi skipun í client möppunni:

* ng serve


Þá er hægt að opna vafra að eigin vali og fara inn á slóðina [http://www.localhost:4200](http://www.localhost:4200) og opnast login síðan inn á sölusíðuna.

## Breytingar á server
Server skránni var breytt við vinnslu verkefnisin en sú ákvörðun var tekin að leyfa notanda að breyta bæði quantityInStock og quantitySold. Í línu 181 þar sem verið er að búa til nýtt product og tekið inn 0 fyrir quantitySold, breyttum við í að hann taki inn req.body.quantitySold. Einnig breyttum við path í imagePath í sömu línu til þess að láta mynd birtast hjá vöru.
Þá bættum við inn tveimur línum(línum 229 og 230) þar sem við látum quantityInStock og quantitySold fá gildi.
