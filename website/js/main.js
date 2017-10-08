const GUESTS_URL = "https://spreadsheets.google.com/feeds/list/" +
                  "1LtvPaJirnFiS9GCntO4sDR9HVL_Zx7aflc6BaWSA3ZU/od6/public/basic?alt=json";
const RSVP_COUPLE_FORM = "https://docs.google.com/forms/d/e/" +
                     "1FAIpQLSed9LizO5RciDTytLMNUr1sde97u_5bI2omj7N529EwCNIJsA/viewform?usp=pp_url";
const RSVP_SINGLE_FORM = "https://docs.google.com/forms/d/e/" +
                         "1FAIpQLSfI0L_0k7hL_356d1isEhFBaExYS5hfd-AVABOgRH40GQdc3w/viewform?usp=pp_url";
const FORM_ENTRY_PARAM = "entry.1875773934";

const CONSOLE_MESSAGE = `
888    d8P            d8b                .d8888b.   .d8888b.   d888   .d8888b.
888   d8P             Y8P               d88P  Y88b d88P  Y88b d8888  d88P  Y88b
888  d8P                                       888 888    888   888  Y88b. d88P
888d88K      .d88b.  8888  .d88b.            .d88P 888    888   888   "Y88888"
8888888b    d88""88b "888 d88""88b       .od888P"  888    888   888  .d8P""Y8b.
888  Y88b   888  888  888 888  888      d88P"      888    888   888  888    888
888   Y88b  Y88..88P  888 Y88..88P      888"       Y88b  d88P   888  Y88b  d88P
888    Y88b  "Y88P"   888  "Y88P"       888888888   "Y8888P"  8888888 "Y8888P"
                      888
                     d88P
                   888P"

Ah, a fellow h4x0r... You might feel more at home here: http://kojo2018.jlf-hacks.com/terminal.html
`;

$(function() {
    console.log(CONSOLE_MESSAGE);

    $('.img-container').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true,
        },
    });

    // hack of the century lol
    let guests = [];
    $.getJSON(GUESTS_URL, (data) => {
        guests = data.feed.entry.map(entry => entry.title["$t"]);
    });
    $("#guest-name").on('input', checkForMatchedName);

    function buildRsvpUrl(guest) {
        const encodedGuest = encodeURIComponent(guest);
        if (guest.indexOf('&') === -1) {
            return `${RSVP_SINGLE_FORM}&${FORM_ENTRY_PARAM}=${encodedGuest}`;
        } else {
            return `${RSVP_COUPLE_FORM}&${FORM_ENTRY_PARAM}=${encodedGuest}`;
        }
    }

    function checkForMatchedName() {
        const found = guests.filter((g) =>
            this.value && g.toLowerCase().indexOf(this.value.toLowerCase()) !== -1
        );
        const html = found.map(f => (
            `<p>
                ${f} <a href="${buildRsvpUrl(f)}" target="_blank">(RSVP)</a>
            </p>`
        ));
        $('#guest-result').html(html);
    }
});
