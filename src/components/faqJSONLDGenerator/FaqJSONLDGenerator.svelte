<script lang="ts">
    import {type Question} from '../../interfaces/Faq'
    import { HighlightAuto } from "svelte-highlight";

    interface Props {
      faqs: Question[]
    }
    let { faqs }: Props = $props()

    let faqJSONLD = $derived({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    })

</script>


<div>

    <HighlightAuto
        languageNames={["json"]}
        code={JSON.stringify(faqJSONLD, null, 2)}
    />
</div>
