import React from 'react'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{politykaId: string}>
}

const policies: Record<string, React.ReactNode> = {
    'regulamin': (
        <div>
            <h1 className='text-5xl mb-8'>Regulamin zakupów</h1>

            <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 1 Definicje pojęć</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>Sklep internetowy działający pod adresem www.on-up.pl, jest prowadzony przez Wydawnictwo On-Up Beata Targowska pod adresem 82-500 Rakowiec; ul. Gajowa 14/2, NIP 5811228975, REGON 192050931 wpisane do rejestru Centralnej Ewidencji i Informacji o Działalności Gospodarczej prowadzonego przez Ministra Gospodarki.</li>
                    <li><strong>SPRZEDAWCA</strong> – Wydawnictwo OnUp Beata Targowska z siedzibą w Rakowcu, ul. Gajowa 14/2, 82-500 Rakowiec.</li>
                    <li><strong>KUPUJĄCY</strong> – osoba fizyczna lub prawna albo jednostka organizacyjna nie posiadająca osobowości prawnej, wyposażona w zdolność prawną, która po zarejestrowaniu posiada dostęp i możliwość składania zamówień na towary z oferty sklepu internetowego www.on-up.pl.</li>
                    <li><strong>KONSUMENT</strong> – osoba fizyczna w rozumieniu art. 22 Kodeksu Cywilnego.</li>
                    <li><strong>CZAS REALIZACJI ZAMÓWIENIA</strong> – liczba dni roboczych potrzebnych Sprzedawcy na skompletowanie zamówienia i wysłanie na adres wskazany przez Kupującego.</li>
                    <li><strong>DZIAŁ REKLAMACJI</strong> – miejsce składania reklamacji i zgłaszania niezgodności towaru z umową.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 2 Postanowienia ogólne</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>Niniejszy regulamin zakupów określa zasady zawarcia i wykonania umowy sprzedaży, za pośrednictwem sklepu internetowego on-up.pl, towarów znajdujących się w ofercie Sprzedawcy.</li>
                    <li>Sklep internetowy wydawnictwa OnUp prowadzi sprzedaż detaliczną za pośrednictwem sieci Internet na terenie Polski.</li>
                    <li>Do współpracy z systemem informatycznym Sprzedawcy wymagane jest posiadanie przez Kupującego urządzenia podłączonego do Internetu z zainstalowaną dowolną przeglądarką internetową.</li>
                    <li>Do dokonania zakupów w sklepie internetowym wydawnictwa OnUp wymagane jest posiadanie przez Kupującego aktywnego konta poczty elektronicznej (adres e-mail).</li>
                    <li>Dokonywanie zakupów w w sklepie internetowym wydawnictwa OnUp może odbywać się wyłącznie na zasadach określonych w treści niniejszego regulaminu zakupów.</li>
                </ol>
            </section>

             <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 3 Rejestracja i ochrona danych osobowych</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>Warunkiem złożenia zamówienia w sklepie internetowym Wydawnictwa OnUP jest rejestracja Kupującego i akceptacja regulaminu zakupów na zasadach określonych poniżej.</li>
                    <li>
                        Osoba wypełniając formularz rejestracyjny oświadcza, że:
                        <ul className="list-disc list-inside ml-5 mt-1">
                            <li>podane w nim dane są kompletne i zgodne ze stanem faktycznym,</li>
                            <li>zapoznała się z regulaminem zakupów i zobowiązuje się go przestrzegać.</li>
                        </ul>
                    </li>
                    <li>Po wypełnieniu i zaakceptowaniu elektronicznego formularza rejestracyjnego, osoba uzyskuje status Kupującego.</li>
                    <li>
                        Podczas rejestracji w sklepie internetowym Wydawnictwa OnUP użytkownik musi podać następujące dane:
                        <ul className="list-disc list-inside ml-5 mt-1">
                            <li>adres e-mail, który będzie loginem identyfikującym Kupującego,</li>
                            <li>hasło,</li>
                            <li>imię i nazwisko,</li>
                            <li>adres zamieszkania, na który zostanie wystawiona faktura i dostarczona przesyłka, chyba że Kupujący wyraźnie wskaże, że zamówiony towar ma być dostarczony na inny adres;</li>
                            <li>numer telefonu.</li>
                        </ul>
                    </li>
                    <li>Kupujący wypełniając formularz rejestracyjny wyraża tym samym zgodę na umieszczenie podanych podczas rejestracji danych w bazie sklepu internetowego Wydawnictwa On-up oraz na ich przetwarzanie w celu realizacji i obsługi zamówień przez Sprzedawcę, który jest jednocześnie administratorem danych, zgodnie z przepisami RODO (Rozporządzenie o Ochronie Danych Osobowych). Dane osobowe znajdujące się w bazie danych Sprzedawcy nie są przekazywane podmiotom nie uczestniczącym w realizacji zamówienia i nie są wykorzystywane w celach marketingowych.</li>
                    <li>Kupujący zgodnie z powołanym powyżej rozporządzeniem ma prawo wglądu do swoich danych i ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych lub do wniesienia sprzeciwu wobec ich przetwarzania, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania danych przed jej odwołaniem. Sprzedawca zapewnia każdemu użytkownikowi prawo kontroli przetwarzania jego danych osobowych.</li>
                    <li>Sklep internetowy sprzedawcy zobowiązuje się do ochrony danych osobowych Kupującego zgodnie z Rozporządzeniem o Ochronie Danych Osobowych.</li>
                    <li>Brak zgody na przetwarzanie danych osobowych określonej w § 3 pkt 5 uniemożliwia zrealizowanie zamówienia Kupującego.</li>
                </ol>
            </section>
            
            <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 4 Ceny oraz opłaty za dostarczenie towarów</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>Wszystkie ceny podane na stronie internetowej Sprzedawcy są wyrażone w złotych polskich i są cenami brutto (zawierają podatek VAT). Wiążąca dla stron transakcji jest cena widniejąca przy produkcie w momencie złożenia zamówienia przez Klienta.</li>
                    <li>Ceny towarów nie zawierają kosztów dostawy.</li>
                    <li>Kupujący ma możliwość wyboru sposobu płatności i sposobu dostawy. Podczas składania zamówienia, po dokonaniu wyboru sposobu dostarczenia zamówienia i sposobu płatności, koszty dostawy są doliczane do łącznej wartości zamówienia i będą wyszczególnione na fakturze jako odrębna pozycja. Aktualna tabela zawierająca informacje o kosztach dostawy dostępna jest na stronach www.elipsa.pl w zakładce Informacje w sekcji Koszty i dostawa.</li>
                    <li>Zamówiony towar jest dostarczany za pomoc firm kurierskich.</li>
                    <li>Na wszystkie zakupione towary wystawiane są przez Sprzedawcę faktury.</li>
                </ol>
            </section>

             <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 5 Formy płatności</h2>
                <p className="mb-2 text-text-tertiary">W sklepie internetowym Wydawnictwa OnUP możliwe są następujące formy płatności:</p>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>
                        płatność elektroniczna on-line – zapłata za pomocą serwisu płatności internetowych PayU:
                         <ul className="list-disc list-inside ml-5 mt-1">
                            <li>karta płatnicza: Visa, Visa Electron, MasterCard, Maestro;</li>
                            <li>ePrzelewy: Płacę PayU, płatności Blik</li>
                            <li>ePłatności: Alior Bank, Banki spółdzielcze, BNP Paribas, BOŚ Bank, Citi Handlowy, Credit Agricole, ING Bank Śląski, Inteligo, mBank, Millennium Bank, Pekao, PKO Bank Polski, Santander, Velobank.</li>
                        </ul>
                    </li>
                    <li>przelewem – wyłącznie dla klientów instytucjonalnych istnieje możliwość zapłaty przelewem po wcześniejszym telefonicznym uzgodnieniu i umieszczeniu odpowiedniej uwagi w zamówieniu.</li>
                </ol>
            </section>

             <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 6 Przyjmowanie i realizacja zamówień</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>Zamówienia od Kupujących są przyjmowane, poprzez stronę www.on-up.pl, 7 dni w tygodniu i 24 godziny na dobę. Informacje o towarach stanowią zaproszenie do zawarcia umowy w rozumieniu art. 71 Kodeksu Cywilnego.</li>
                    <li>Kupujący, składając zamówienie, składa ofertę zawarcia ze Sprzedawcą umowy sprzedaży zamawianych towarów. Każda płatność zrealizowana przez Kupującego – z wyjątkiem płatności realizowanej przy odbiorze zamówienia – stanowi do momentu wysłania przez Sprzedawcę potwierdzenia przyjęcia zamówienia do realizacji, przedpłatę na poczet realizacji zamówienia. W wyniku złożonego przez Kupującego zamówienia, Sprzedawca przesyła do Kupującego specyfikację dokonanego przez niego zamówienia na podany przez Kupującego adres e-mail. Specyfikacja ta nie stanowi potwierdzenia przyjęcia zamówienia do realizacji.</li>
                    <li>
                         W celu złożenia zamówienia Kupujący zobowiązany jest dokonać:
                         <ul className="list-disc list-inside ml-5 mt-1">
                            <li>wyboru zamawianych towarów,</li>
                            <li>wyboru sposobu dostawy, spośród dostępnych oraz adresu dostawy i adresu, na jaki ma być wystawiona faktura (mogą to być różne adresy),</li>
                            <li>wyboru sposobu płatności spośród dostępnych w sklepie internetowym Wydawnictwa OnUP,</li>
                            <li>płatności w przypadku wyboru płatności elektronicznej on-line.</li>
                        </ul>
                    </li>
                    <li>
                        Potwierdzenie przyjęcia zamówienia do realizacji, zostanie wysłane na podany przez Kupującego adres e-mail – stanowiąc oświadczenie o przyjęciu oferty, o której mowa powyżej – niezwłocznie po zweryfikowaniu przez Sprzedawcę dostępności towarów w magazynie. Potwierdzenie przyjęcia zamówienia do realizacji zawiera następujące informacje:
                         <ul className="list-disc list-inside ml-5 mt-1">
                            <li>numer zamówienia, data złożenia i osoba zamawiająca,</li>
                            <li>łączna wartość zamówienia brutto,</li>
                            <li>sposób zapłaty i dostawy,</li>
                            <li>informacje o prawie odstąpienia od umowy i formularz odstąpienia od umowy w załączniku.</li>
                         </ul>
                    </li>
                    <li>Z tą chwilą, uważa się umowę sprzedaży pomiędzy Sprzedawcą a Kupującym za zawartą.</li>
                    <li>Faktura sprzedaży będzie wysyłana drogą elektorniczną.</li>
                    <li>W przypadku braku zapłaty za towar objęty zamówieniem z wybraną płatnością elektroniczną on-line w terminie 3 dni od dnia złożenia zamówienia, Sprzedawca anuluje złożone zamówienie, o czym Kupujący zostanie poinformowany, poprzez wysłanie wiadomości na podany przez Kupującego adres e-mail.</li>
                    <li>Czas realizacji zamówienia przez Sprzedawcę wynosi do 1-3 dni roboczych liczonych od momentu wysłania potwierdzenie przyjęcia zamówienia do realizacji. Czas dostarczenia przesyłki przez firmę kurierską 1-3 dni robocze.</li>
                    <li>Sprzedawca nie będzie ponosić wobec Kupującego odpowiedzialności za opóźnienia w dostarczeniu zamówionych towarów, jeżeli do opóźnienia doszło z przyczyn leżących po stronie Kupującego (np. błędny adres).</li>
                    <li>W przypadku, gdy czas realizacji byłby dłuższy niż podany powyżej lub na stronie www.on-up.pl, Sprzedawca skontaktuje się z Kupującym, aby potwierdzić realizację zamówienia oraz uzgodnić ostateczny termin dostawy.</li>
                </ol>
            </section>

             <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 7 Prawo odstąpienia od umowy i zasady zwrotów</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>Kupującemu będącemu konsumentem przysługuje prawo do odstąpienia od umowy i zwrotu towarów zakupionych w sklepie internetowym Wydawnictwa OnUP w terminie 14 dni od daty odebrania przez niego przesyłki, bez podania przyczyny i bez ponoszenia kosztów. Jeżeli jednak Kupujący wybrał sposób dostarczenia towaru inny niż najtańszy zwykły sposób dostarczenia oferowany przez Sprzedawcę, Sprzedawca nie jest zobowiązany do zwrotu klientowi poniesionych przez niego dodatkowych kosztów.</li>
                    <li>Jeśli wśród zamówionych towarów są ebooki (produkty cyfrowe), to po opłaceniu zamówienia i pobraniu pliku Kupujący traci prawo do odstąpienia od umowy i zwrotu tego towaru.</li>
                    <li>Bieg terminu do odstąpienia od umowy rozpoczyna się od dnia objęcia towaru w posiadanie przez Kupującego lub wskazaną przez niego osobę trzecią inną niż przewoźnik.</li>
                    <li>
                         Aby skorzystać z prawa odstąpienia od umowy, Kupujący powinien poinformować Sprzedawcę o swojej decyzji o odstąpieniu od umowy w drodze jednoznacznego oświadczenia o odstąpieniu od umowy. Konsument może skorzystać z formularza odstąpienia zamieszczonego w zakładce Zwroty lub dostarczanego mu wraz z potwierdzeniem przyjęcia zamówienia do realizacji (jednak nie jest to obowiązkowe). Kupujący powinien złożyć oświadczenie o odstąpieniu od umowy wysyłając wypełnione oświadczenie na jeden z podanych poniżej adresów:
                        <ul className="list-disc list-inside ml-5 mt-1">
                            <li>adres korespondencyjny: Wydawnictwo OnUp z siedzibą w Rakowcu, ul. Gajowa 14/2, 82-500 Rakowiec,</li>
                            <li>e-mail: <a href="mailto:onup.wydawnictwo@gmail.com" className="text-secondary hover:text-secondary-hover underline">onup.wydawnictwo@gmail.com</a></li>
                        </ul>
                    </li>
                    <li>Sprzedawca za pośrednictwem poczty elektronicznej (e-mail) niezwłocznie przesyła Kupującemu potwierdzenie otrzymania oświadczenia o odstąpieniu od umowy.</li>
                    <li>Odstąpienie od umowy może dotyczyć wszystkich towarów objętych zamówieniem albo ich części.</li>
                    <li>Do zachowania terminu odstąpienia od umowy wystarczy wysłanie oświadczenia przed jego upływem.</li>
                    <li>Jeżeli strony nie umówiły się inaczej, prawo odstąpienia od umowy zawartej na odległość nie przysługuje Konsumentowi w wypadkach dostarczenia treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnienie świadczenia rozpoczęło się za wyraźną zgodą Konsumenta przed upływem terminu do odstąpienia od umowy i po poinformowaniu go przez Sprzedawcę o utracie prawa odstąpienia od umowy.</li>
                    <li>Zwracane towary muszą być kompletne. Towary powinny być zwrócone w stanie niezmienionym chyba, że zmiana była konieczna w granicach zwykłego zarządu, tj. Konsument powinien postępować z towarem mając na uwadze, konieczność jego ewentualnego, późniejszego zwrotu. Konsument ponosi odpowiedzialność za zmniejszenie wartości rzeczy będące wynikiem korzystania z niej w sposób wykraczający poza konieczny do stwierdzenia charakteru, cech i funkcjonowania rzeczy.</li>
                    <li>
                        W przypadku odstąpienia od umowy, Kupujący zobowiązany jest do zwrotu otrzymanego towaru niezwłocznie, w terminie nie dłuższym niż 14 dni od dnia odstąpienia od umowy. Do zachowania tego terminu wystarczy wysłanie towaru przed jego upływem. Towar wraz z otrzymaną fakturą należy zwrócić na adres:
                        <address className="not-italic ml-5 mt-1 block">
                            Wydawnictwo OnUp<br/>
                            ul. Gajowa 14/2<br/>
                            82-500 Rakowiec<br/>
                            z dopiskiem: Zwrot – sklep internetowy Wydawnictwa On-Up
                        </address>
                    </li>
                    <li>Sprzedawca może wstrzymać się ze zwrotem płatności otrzymanych od klienta do chwili otrzymania towaru z powrotem lub dostarczenia przez Klienta dowodu jej odesłania, w zależności od tego, które zdarzenie wystąpi wcześniej.</li>
                    <li>Kupujący ponosi wszystkie bezpośrednie koszty zwrotu towaru do Sprzedawcy, tytułem odstąpienia od umowy, to jest koszty pakowania, zabezpieczenia i nadania. Sprzedawca nie przyjmuje przesyłek wysłanych za pobraniem.</li>
                    <li>W przypadku pozostałych Kupujących, nie posiadających statusu Konsumenta, zasady i terminy odstąpienia od umowy regulują przepisy Kodeksu Cywilnego.</li>
                    <li>Zwrot pieniędzy wpłaconych przez Kupującego nastąpi nie później niż w terminie 14 dni. Jeżeli Kupujący dokonał płatności kartą płatniczą lub przelewem elektronicznym zwrot należności następuje na kartę kredytową lub rachunek bankowy, z którego nastąpiła płatność (zwrot płatności przy użyciu takiego samego sposobu zapłaty).</li>
                    <li>W przypadku płatności przy odbiorze lub gdy z przyczyn niezależnych od Sprzedawcy identyfikacja rachunku bankowego, z którego nastąpiła płatność jest niemożliwa (brak możliwości zwrotu płatności przy użyciu takiego samego sposobu zapłaty), Kupujący zostanie poinformowany o tym e-mailem i poproszony o wydanie pisemnej dyspozycji o przekazaniu pieniędzy na rachunek bankowy Kupującego lub przesłaniu przekazem pocztowym.</li>
                    <li>Sprzedawca zastrzega sobie prawo do zweryfikowania tożsamości Kupującego składającego polecenie zwrotu, w przypadku powzięcia wątpliwości co do tożsamości Kupującego.</li>
                    <li>Uprawnienie do odstąpienia od umowy nie wyłącza uprawnień Kupującego wynikających z odpowiedzialności Sprzedawcy za wady towaru oraz gwarancji producenta.</li>
                </ol>
            </section>

             <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 8 Reklamacje</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>
                        Sprzedawca zobowiązany jest do wydania towaru bez wad. Wszystkie towary posiadają gwarancję Sprzedawcy obowiązującą na terenie Polski. W przypadku niezgodności towaru z zamówieniem, uszkodzenia towaru podczas dostawy lub stwierdzenia wad, Kupujący zgłasza reklamację do działu zamówień i rozliczeń sprzedaży: tel. 506 610 405 lub e-mail: <a href="mailto:onup.wydawnictwo@gmail.com" className="text-secondary hover:text-secondary-hover underline">onup.wydawnictwo@gmail.com</a>.
                    </li>
                    <li>
                        Na zasadach określonych w Kodeksie Cywilnym, Kupujący może żądać naprawy towaru, wymiany towaru na wolny od wad, obniżenia ceny towaru albo może odstąpić od umowy sprzedaży. W takim przypadku Kupujący powinien odesłać reklamowany towar wraz z fakturą oraz protokołem niezgodności (a także ewentualne oczekiwania dotyczące sposobu realizacji zobowiązań przez Sprzedawcę) za pomocą Poczty Polskiej na adres Sprzedawcy:
                        <address className="not-italic ml-5 mt-1 block">
                            Wydawnictwo On-Up<br/>
                            ul. Gajowa 14/2,<br/>
                            82-500 Rakowiec<br/>
                            z dopiskiem: reklamacja – sklep internetowy on-up.pl
                        </address>
                    </li>
                    <li>Sklep internetowy Wydawnictwa OnUp zobowiązuje się niezwłocznie, jednak najpóźniej w ciągu 14 dni od daty otrzymania przesyłki z reklamowanym towarem, ustosunkować się do złożonej reklamacji i poinformować Kupującego o dalszym postępowaniu. Koszty związane z odesłaniem towaru reklamowanego (paczka ekonomiczna), Sprzedawca zwraca po rozpatrzeniu reklamacji zgodnie z procedurą opisaną w § 7.</li>
                    <li>W każdym z powyższych przypadków, gdy realizacja żądań Kupującego wiąże się z dostawą nowego lub naprawionego towaru, wszystkie koszty dostawy ponosi Sprzedawca.</li>
                </ol>
            </section>
            
             <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4'>§ 9 Postanowienia końcowe</h2>
                <ol className='list-decimal list-inside space-y-2 mx-8 text-text-tertiary'>
                    <li>Informacje znajdujące się na stronie sklepu internetowego on-up.pl nie stanowią oferty w rozumieniu Kodeksu Cywilnego. Kupujący składając zamówienie za pomocą mechanizmów dostępnych na stronie internetowej księgarni, składa ofertę kupna określonego towaru na warunkach podanych w zamówieniu.</li>
                    <li>W sprawach nieuregulowanych niniejszym regulaminem obowiązują przepisy Kodeksu Cywilnego oraz Ustawy o prawach konsumenta, Ustawy o świadczeniu usług drogą elektroniczną i Ustawy o ochronie danych osobowych.</li>
                    <li>Regulamin określa zasady zakupów na stronie sklepu internetowego on-up.pl. Złożenie zamówienia jest równoznaczne ze zgodą na wszystkie postanowienia i informacje zawarte w regulaminie.</li>
                </ol>
            </section>
        </div>
    ),
    'dostawy-i-platnosci': (
        <div>
            <h1 className='text-5xl mb-8'>Dostawy i płatność</h1>
            
            <p className='mb-4 text-text-tertiary leading-relaxed'>
                Pamiętaj, że dodanie produktu do koszyka <strong className='text-black'>nie rezerwuje go dla Ciebie</strong>, aby otrzymać produkty <strong className='text-black'>należy zakończyć proces zakupu</strong>. Jeśli w trakcie składania zamówienia wybierzesz inną płatność niż <strong className='text-black'>płatność Blik</strong> i nie dokonasz natychmiastowej zapłaty od razu, zamówienie zostanie wysłane dopiero po zaksięgowaniu wpłaty.
            </p>

            <p className='mb-8 text-text-secondary leading-relaxed border-2 border-indicator-warn-border bg-indicator-warn py-1 px-2 rounded-lg  w-fit'>
                Zamówienia dla szkół, przesyłane na adres szkoły, możliwe z odroczoną płatnością po uzgodnieniu warunków telefonicznie. Nr tel. 506 610 405.
            </p>

            <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4 uppercase'>Jak pakujemy przesyłki (bezpieczeństwo przesyłki)</h2>
                <p className='text-text-tertiary leading-relaxed'>
                    Bardzo staramy się, aby przesyłka przygotowana dla Ciebie była odpowiednio przygotowana, jeśli jednak wygląda na uszkodzoną w czasie transportu, przyjmij paczkę i spisz protokół reklamacyjny w obecności kuriera. Jeśli możesz, wykonaj zdjęcia zniszczeń i dołącz do korespondencji reklamacyjnej.
                </p>
            </section>

            <section className="mb-8">
                <h2 className='font-bold text-2xl mb-4 uppercase'>W jaki sposób wysyłane są zamówienia</h2>
                <ul className='list-none space-y-2 text-text-tertiary'>
                    <li>Paczkomaty InPost 1-2 dni robocze 16,00 PLN</li>
                    <li>Orlen paczka 1-2 dni robocze 12,00 PLN</li>
                    <li>Kurier 1-2 dni robocze koszt 20,00 PLN</li>
                    <li>Poczta Polska 20,00 PLN</li>
                </ul>
            </section>
        </div>
    ),
    'polityka-prywatnosci': (
        <div className='flex flex-col gap-6 text-text-tertiary'>
            <h1 className='text-5xl mb-2 text-text-primary font-bold text-center sm:text-left'>Polityka prywatności</h1>
            
            <p>
                Polityka prywatności służy jako pomoc w zrozumieniu, jakie dane zbieramy i w jakim celu oraz do czego je wykorzystujemy. Te informacje są ważne, dlatego prosimy o dokładne zapoznanie się z tym dokumentem.
            </p>

            <p>
                Administratorem Twoich danych osobowych jest Wydawnictwo OnUP Beata Targowska z siedzibą w Rakowcu, ul. Gajowa 14/2, 82-500 Rakowiec.
            </p>

            <p>
                Twoje dane otrzymaliśmy od Ciebie podczas dobrowolnego zakładania konta na naszej stronie internetowej www.on-up.pl. Podstawowym sposobem pozyskiwania danych osobowych jest dobrowolne wypełnienie formularza. Administrator pozyskuje w ten sposób imię, nazwisko, adres, numer telefonu oraz adres e-mail użytkownika, który będzie loginem.<br/>
                Podanie danych osobowych jest dobrowolne, jednakże brak zgody na ich przetwarzanie przez nas może uniemożliwić nam świadczenie Tobie usług drogą elektroniczną oraz dokonywanie przez Ciebie zakupów w sklepie internetowym on-up.pl.<br/>
                Login i hasło są poufnymi danymi zabezpieczającymi Twoje konto przed nieuprawnioną ingerencją osób trzecich, dlatego zobowiązujesz się do nieudostępniania tych danych osobom postronnym.
            </p>

            <p>
                Przetwarzanie Twoich danych pozwala nam na świadczenie usług przez księgarnię internetową działającą pod adresem www.on-up.pl, w szczególności na utrzymaniu konta, realizowaniu Twoich zamówień, kontaktów związany z wykonywaniem umowy sprzedaży, a także przesyłaniu informacji o nowościach w postaci newslettera.
            </p>

            <p>
                Twoje dane osobowe będą przechowywane przez okres trwania umowy. Dodatkowo, po rozwiązaniu umowy, Twoje dane będą przechowywane ze względu na obowiązki wynikające z regulacji księgowych i podatkowych, przez czas ich trwania, oraz ze względów bezpieczeństwa prawnego, do czasu przedawnienia ewentualnych roszczeń. W zakresie, w jakim podstawą przetwarzania Twoich danych jest zgoda, Twoje dane będą przetwarzane do czasu jej wycofania. Zgodę możesz wycofać w dowolnym momencie. Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego przed jej wycofaniem.
            </p>

            <div>
                Jeśli chcesz wycofać zgodę na przetwarzanie danych osobowych prosimy o wysłanie e-maila lub listu na adres:
                <address className='not-italic mt-2 ml-4'>
                    Wydawnictwo OnUp<br/>
                    ul. Gajowa 14/2<br/>
                    82-500 Rakowiec<br/>
                    e-mail: <a href="mailto:onup.wydawnictwo@gmail.com" className='text-secondary hover:text-secondary-hover underline'>onup.wydawnictwo@gmail.com</a>
                </address>
            </div>

            <p>
                W związku z usługami jakie podmioty zewnętrzne świadczą na rzecz naszej księgarni internetowej, podmioty te mogą uzyskać dostęp do Twoich danych osobowych, w zakresie niezbędnym dla realizacji tych usług. Te podmioty to dostawcy usług i systemów informatycznych, operatorzy pocztowi i kurierzy oraz operatorzy płatności.
            </p>

            <p>
                W celu zapewnienia wysokiej jakości usług, zapamiętywania ustawień i preferencji klienta oraz gromadzenia anonimowych informacji związanych z korzystaniem ze stron naszego sklepu www.on-up.pl wykorzystujemy pliki cookies (tzw. ciasteczka). Korzystając z naszych stron wyrażasz zgodę na wykorzystywanie plików cookies.
            </p>

            <p>
                Możesz wyłączyć ten mechanizm w dowolnym momencie w ustawieniach swojej przeglądarki internetowej. Korzystanie z naszego sklepu bez zmiany ustawień dotyczących cookies oznacza, że będą one zapisane w pamięci Twojego urządzenia (informacje na temat sesji, ostatnio oglądanych produktów, produktów w koszyku itp.).
            </p>
            
            <p>
                Każda osoba posiada prawo dostępu do swoich danych i ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych lub do wniesienia sprzeciwu wobec ich przetwarzania, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania danych przed jej odwołaniem.
            </p>

            <p>
                Osoba, której dane dotyczą, ma prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, gdy uzna, iż przetwarzanie jej danych osobowych narusza przepisy RODO (Rozporządzenie o Ochronie Danych Osobowych). Podanie danych osobowych jest dobrowolne.
            </p>

            <p>
                Jeśli uważasz, że przetwarzając Twoje dane naruszamy Twoje prawa skontaktuj się z nami.
            </p>

            <div className='mt-4'>
                <strong className='text-black text-lg block mb-2'>Kontakt:</strong>
                <address className='not-italic'>
                    Wydawnictwo OnUp<br/>
                    ul. Gajowa 14/2 82-500 Rakowiec<br/>
                    e-mail: <a href="mailto:onup.wydawnictwo@gmail.com" className='text-secondary hover:text-secondary-hover underline'>onup.wydawnictwo@gmail.com</a><br/>
                    tel. 506 610 405
                </address>
            </div>
        </div>
    ),
    'polityka-zwrotow': (
        <div className='flex flex-col gap-6 text-text-tertiary'>
            <h1 className='text-5xl mb-2 text-text-primary font-bold text-center sm:text-left'>Zwroty</h1>
            
            <p>
                Kupującemu będącemu konsumentem przysługuje prawo do odstąpienia od umowy i zwrotu towarów zakupionych w sklepie Wydawnictwa On-UP w terminie 14 dni od daty odebrania przez niego przesyłki. Aby skorzystać z prawa odstąpienia od umowy, Kupujący powinien poinformować Sprzedawcę o swojej decyzji o odstąpieniu od umowy w drodze jednoznacznego oświadczenia o odstąpieniu od umowy. Konsument może skorzystać ze strony <span className='text-secondary underline cursor-pointer'>Formularz odstąpienia</span>. Kupujący powinien złożyć oświadczenie o odstąpieniu od umowy wysyłając wypełnione oświadczenie na jeden z podanych poniżej adresów:
            </p>

            <ul className='list-none space-y-2 ml-4'>
                <li>a. adres korespondencyjny: Wydawnictwo On-Up, ul. Gajowa 14/2, 82-500 Rakowiec,</li>
                <li>b. email : <a href="mailto:onup.wydawnictwo@gmail.pl" className='text-secondary hover:text-secondary-hover underline'>onup.wydawnictwo@gmail.pl</a></li>
            </ul>

            <p>
                Jeżeli oświadczenie zostanie przysłane za pośrednictwem poczty elektronicznej (e-mail) Sprzedawca niezwłocznie przesyła Kupującemu potwierdzenie otrzymania oświadczenia o odstąpieniu od umowy.
            </p>

            <p>
                Odstąpienie od umowy może dotyczyć wszystkich towarów objętych zamówieniem albo ich części.
            </p>

            <p>
                Zwracane towary muszą być kompletne. Towary powinny być zwrócone w stanie niezmienionym. W przypadku odstąpienia od umowy, Kupujący zobowiązany jest do zwrotu otrzymanego towaru niezwłocznie, w terminie nie dłuższym niż 14 dni od dnia odstąpienia od umowy. Do zachowania tego terminu wystarczy wysłanie towaru przed jego upływem. Towar wraz z otrzymaną fakturą należy zwrócić na adres:
            </p>

            <address className='not-italic text-center py-4'>
                Wydawnictwo On-Up<br/>
                ul. Gajowa 14/2,<br/>
                82-500 Rakowiec<br/>
                z dopiskiem: Zwrot – sklep Wydawnictwo On-Up
            </address>

            <p>
                Sprzedawca może wstrzymać się ze zwrotem płatności otrzymanych od klienta do chwili otrzymania towaru z powrotem lub dostarczenia przez Klienta dowodu jej odesłania, w zależności od tego, które zdarzenie wystąpi wcześniej.
            </p>

            <p>
                Kupujący ponosi wszystkie bezpośrednie koszty zwrotu towaru do Sprzedawcy, tytułem odstąpienia od umowy, to jest koszty pakowania, zabezpieczenia i nadania. Sprzedawca nie przyjmuje przesyłek wysłanych za pobraniem.
            </p>

            <p>
                Zwrot pieniędzy wpłaconych przez Kupującego nastąpi nie później niż w terminie 14 dni. Zwrot należności następuje na rachunek bankowy, z którego nastąpiła płatność.
            </p>

            <p>
                W przypadku płatności przy odbiorze lub gdy z przyczyn niezależnych od Sprzedawcy identyfikacja rachunku bankowego, z którego nastąpiła płatność jest niemożliwa (brak możliwości zwrotu płatności przy użyciu takiego samego sposobu zapłaty), Kupujący zostanie poinformowany o tym e-mailem i poproszony o wydanie pisemnej dyspozycji o przekazaniu pieniędzy na rachunek bankowy Kupującego lub przesłaniu przekazem pocztowym.
            </p>

            <p>
                Sprzedawca zastrzega sobie prawo do zweryfikowania tożsamości Kupującego składającego polecenie zwrotu, w przypadku powzięcia wątpliwości co do tożsamości Kupującego.
            </p>

            <p>
                Uprawnienie do odstąpienia od umowy nie wyłącza uprawnień Kupującego wynikających z odpowiedzialności Sprzedawcy za wady towaru oraz gwarancji producenta.
            </p>
        </div>
    ),
    'o-nas': (
        
        <div className='flex flex-col gap-6 text-text-tertiary'>
            <h1 className='text-5xl mb-2 text-text-primary font-bold'>Wydawnictwo OnUp</h1>
            
            <p>
                Jest wydawnictwem specjalizującym się w publikacjach szkolnych, ze szczególnym uwzględnieniem szkolnictwa zawodowego.
            </p>

            <p>
                Wydawnictwo istnieje od 2018 roku. Na początku pod nazwą Wydawnictwo TD, a od roku 2022 Wydawnictwo OnUp.
            </p>

            <p>
                Wydawnictwo prowadzi także działalność usługową dla szkół podręczniki, czasopisma, skrypty i broszury (opracowanie redakcyjne, przygotowanie do druku, druk oraz dystrybucja).
            </p>

            <p>
                Szerszą informację o wydanych przez nas książkach, które są aktualnie dostępne w sprzedaży, znajdą Państwo w naszym sklepie internetowym.
            </p>

            <div className='mt-8 space-y-1'>
                <strong className='block text-text-primary font-bold'>Wydawnictwo OnUp</strong>
                <address className='not-italic'>
                    ul. Gajowa 14/2, 82-500 Rakowiec<br/>
                    NIP 5811228975, REGON 192050931<br/>
                    Firma wpisana do CEIDG
                </address>
            </div>

            <div className='mt-4 space-y-1'>
                <p>tel. 506610405</p>
                <p>e-mail: <a href="mailto:onup.wydawnictwo@gmail.com" className='text-secondary hover:text-secondary-hover underline'>onup.wydawnictwo@gmail.com</a></p>
            </div>
        </div>
    )
}

export default async function page({ params }: Props) {
    const {politykaId} = await params


    if (!policies[politykaId]) notFound()
    return (
        <div className="container mx-auto py-12 px-4 min-h-[50vh]">
            {policies[politykaId]}
        </div>
    )
}