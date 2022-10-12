<script lang="ts">
    import './main.css';
    
    interface Paper {
        id: Number,
        createdAt: Date,
        updatedAt: Date,
        publishedAt?: String,
        pmid?:      String,
        doi?:       String,
        title?:     String,
        authors?:   String,
        abstract?:   String,
        journal?:   String,
        structuredData?: StructuredData
    }

    interface StructuredData
    {
        id?: Number,
        createdAt?: Date,
        updatedAt?: Date,
        paperId: Number,
        paper?: Paper,
        investigatedScore?: String,
        scoreAbbreviation?: String,
        disease?: String,
        construct?: String,
        subgroup?: String,
        n?: Number,
        isComparative?: Boolean,
        isProposal?: Boolean,
        comparedWith?: String,
        numItems?: Number,
        itemsReportedByPhysician?: Boolean,
        itemsReportedByPatient?: Boolean,
        itemsReportedByOther?: Boolean,
        reportedMetrics: Metric[],
        cosmin1_1?: Number,
        cosmin1_2?: Number,
        cosmin1_3?: Number,
        cosmin1_4?: Number,
        cosmin1_5?: Number,
        cosmin1_6?: Number,
        cosmin1_7?: Number,
        cosmin1_8?: Number,
        cosmin1_9?: Number,
        cosmin2_1?: Number,
        cosmin2_2?: Number,
        cosmin2_3?: Number,
        cosmin2_4?: Number,
        cosmin2_5?: Number,
        cosmin2_6?: Number,
        cosmin2_7?: Number,
        cosmin2_8?: Number,
    }

    interface Metric
    {
        name: String,
        value: String,
    }
    
    let papers: Paper[] = [];
    let selectedPaper: Paper;

    let selectedData: StructuredData;

    function loadData()
    {
        fetch('/list').then((d) => d.json()).then((data) => {
            papers = data;
            if(localStorage.getItem('selectedPaperPMID'))
            {
                let s = papers.find(elem => elem.pmid == localStorage.getItem('selectedPaperPMID'));
                if(s)
                {
                    selectPaper(s);
                }
            }
       });
    }

    loadData();
    function selectPaper(p:Paper)
    {
        selectedPaper = p;
        selectedData = (p.structuredData ? p.structuredData : {paperId: p.id, reportedMetrics: []});
        localStorage.setItem('selectedPaperPMID', p.pmid);
    }

    function submit()
    {
        console.log(selectedData);
    }
</script>
<style type="text/css">
.input input
{
    width: 80%;
}

input[type="radio"]
{
    margin-right: .5em;
}
</style>
<svelte:head>
    <title>Data Extract0r</title>
    <!-- Credit: https://icons.getbootstrap.com/icons/box-arrow-down/ (MIT license) -->
    <link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktYm94LWFycm93LWRvd24iIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMy41IDEwYS41LjUgMCAwIDEtLjUtLjV2LThhLjUuNSAwIDAgMSAuNS0uNWg5YS41LjUgMCAwIDEgLjUuNXY4YS41LjUgMCAwIDEtLjUuNWgtMmEuNS41IDAgMCAwIDAgMWgyQTEuNSAxLjUgMCAwIDAgMTQgOS41di04QTEuNSAxLjUgMCAwIDAgMTIuNSAwaC05QTEuNSAxLjUgMCAwIDAgMiAxLjV2OEExLjUgMS41IDAgMCAwIDMuNSAxMWgyYS41LjUgMCAwIDAgMC0xaC0yeiIvPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTcuNjQ2IDE1Ljg1NGEuNS41IDAgMCAwIC43MDggMGwzLTNhLjUuNSAwIDAgMC0uNzA4LS43MDhMOC41IDE0LjI5M1Y1LjVhLjUuNSAwIDAgMC0xIDB2OC43OTNsLTIuMTQ2LTIuMTQ3YS41LjUgMCAwIDAtLjcwOC43MDhsMyAzeiIvPgo8L3N2Zz4=">
</svelte:head>
<div class="flex gap-4 p-10 prose min-w-full">
    <div class="w-[15%]">
        <h2 class="m-0">PMIDs</h2>
        <div class="flex flex-col gap-1">
            {#each papers as p}
                <div class="cursor-pointer" on:click={selectPaper(p)}>
                    {p.pmid}
                    {#if p.structuredData}
                        <b>&check;</b>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    <div class="w-[85%]">
        {#if selectedPaper}
            <h2 class="mt-0">{selectedPaper.title}</h2>
            <div class="mb-2">{selectedPaper.authors}; {selectedPaper.journal}; {(new Date(selectedPaper.publishedAt)).toLocaleDateString('de-DE')}</div>
            <div><a target="_blank" href="https://pubmed.ncbi.nlm.nih.gov/{selectedPaper.pmid}/">PubMed</a></div>
            <div class="mb-2"><a target="_blank" href="https://sci-hub.se/{selectedPaper.doi}/">SciHub</a></div>
            
            <div class="grid grid-cols-2 gap-2 w-[65%]">
                <div class="label">Investigated Score: </div>
                <div class="input"><input type="text" bind:value={selectedData.investigatedScore}></div>
                <div class="label">Score Abbv:</div>
                <div class="input"><input type="text" bind:value={selectedData.scoreAbbreviation}></div>
                <div class="label">Disease or Indication:</div>
                <div class="input"><input type="text" bind:value={selectedData.disease}></div>
                <div class="label">Construct to be measured (dis. activity/QoL):</div>
                <div class="input"><input type="text" bind:value={selectedData.construct}></div>
                <div class="label">Subgroup/population:</div>
                <div class="input"><input type="text" bind:value={selectedData.subgroup}></div>
                <div class="label">Sample size:</div>
                <div class="input"><input type="text" bind:value={selectedData.n}></div>
                <div><input type="checkbox" bind:checked={selectedData.isComparative} id="isC"> <label for="isC">Comparative study</label> </div>
                <div><input type="checkbox" bind:checked={selectedData.isProposal} id="isN"> <label for="isN">New proposal</label> </div>
                <div class="label">Compared with:</div>
                <div class="input"><input type="text" bind:value={selectedData.comparedWith}></div>
                <div class="label"># items:</div>
                <div class="input"><input type="number" bind:value={selectedData.n}></div>
                <div class="space-x-2">
                    <span>Items reported by: </span>
                    <input type="checkbox" bind:checked={selectedData.itemsReportedByPhysician} id="repPh"> <label for="repPh">Physician</label> 
                    <input type="checkbox" bind:checked={selectedData.itemsReportedByPatient} id="repPa"> <label for="repPa">Patient</label>
                    <input type="checkbox" bind:checked={selectedData.itemsReportedByOther} id="repO"> <label for="repO">Other</label>
                </div>
                <div></div>
                <div class="label">Reported metrics</div>
                <div>
                    <div class="grid grid-cols-2">
                    {#each selectedData.reportedMetrics as m}
                        <div><input type="text" bind:value={m.name} placeholder="name"></div>
                        <div><input type="text" bind:value={m.value} placeholder="value"></div>
                    {/each}
                    <div class="text-xl cursor-pointer" on:click={() => {selectedData.reportedMetrics = [...selectedData.reportedMetrics ,{name: '', value: ''}]}}>&plus;</div>
                    </div>
                </div>
            </div>
            <h4>COSMIN Risk of Bias</h4>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto">
                <!-- Section 1 -->
                <div class="col-span-6 font-bold">For study on reliability</div>
                <div>Were patients stable in the time between the repeated measurements on the construct to be measured?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_1} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_1} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_1} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_1} value={1}>No (+evidence)</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_1} value={0}>NA</div>
                <!---->
                <div>Was the time interval between the repeated measurements appropriate?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_2} value={4}>Yes</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.cosmin1_2} value={2}>Doubtful/no time</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_2} value={1}>No</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_2} value={0}>NA</div>
                <!---->
                <div>Were the measurement conditions similar for the repeated measurements &ndash; except for the condition being evaluated as a source of variation?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_3} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_3} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_3} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_3} value={1}>No</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_3} value={0}>NA</div>
                <!---->
                <div>Was the time interval between the repeated measurements appropriate?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_4} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_4} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_4} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_4} value={1}>No</div>
                <div></div>
                <!---->
                <div>Did the professional(s) assign scores or determine values without knowledge of the scores or values of other repeated measurement(s) in the same patients?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_5} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_5} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_5} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_5} value={1}>No</div>
                <div></div>
                <!---->
                <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_6} value={4}>No</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.cosmin1_6} value={2}>Minor</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_6} value={1}>Yes</div>
                <div></div>
                <!---->
                <div>For continuous scores: was an intraclass correlation coefficient (ICC) calculated?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_7} value={4}>ICC calculated; all ok</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_7} value={3}>ICC calc'ed, but no desc of formula</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_7} value={2}>ICC calc'ed, but systematic difference between measurements</div>
                <div></div>
                <div></div>
                <!---->
                <div>For ordinal scores: was a (weighted) kappa calculated?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_8} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_8} value={3}>Kappa calculated, but weighting scheme not described or does not optimally match the study design</div>
                <div></div>
                <div></div>
                <div></div>
                <!---->
                <div>For dichotomous/nominal scores: was Kappa calculated for each category against the other categories combined?</div>
                <div><input type="radio" bind:group={selectedData.cosmin1_9} value={4}>Kappa calculated for each category against the other categories combined</div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <!-- Section 2 -->
                <div class="col-span-6 font-bold">For study on measurement error</div>
                <!---->
                <div>Were patients stable in the time between the repeated measurements on the construct to be measured?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_1} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_1} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_1} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_1} value={1}>No</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_1} value={0}>NA</div>
                <!---->
                <div>Were patients stable in the time between the repeated measurements on the construct to be measured?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_2} value={4}>Yes</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.cosmin2_2} value={2}>Doubtful/no time</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_2} value={1}>No</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_2} value={0}>NA</div>
                <!---->
                <div>Were the measurement conditions similar for the repeated measurements &ndash; except for the condition being evaluated as a source of variation?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_3} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_3} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_3} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_3} value={1}>No</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_3} value={0}>NA</div>
                <!---->
                <div>Did the professional(s) administer the measurement without knowledge of scores or values of other repeated measurement(s) in the same patients?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_4} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_4} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_4} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_4} value={1}>No</div>
                <div></div>
                <!---->
                <div>Did the professional(s) assign scores or determine values without knowledge of the scores or values of other repeated measurement(s) in the same patients?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_5} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_5} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_5} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_5} value={1}>No</div>
                <div></div>
                <!---->
                <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_6} value={4}>No</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.cosmin2_6} value={2}>Minor</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_6} value={1}>Yes</div>
                <div></div>
                <!---->
                <div>For continuous scores: was the Standard Error of Measurement (SEM), Smallest Detectable Change (SDC), Limits of Agreement (LoA) or Coefficient of Variation (CV) calculated?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_7} value={4}>Calc'ed, formula described</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_7} value={3}>Calc'ed, formula not described</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_7} value={2}>Calc'ed, but systemic difference</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_7} value={1}>SEM based on &alpha; or other</div>
                <div></div>
                <!---->
                <div>For dichotomous/nominal/ordinal scores: Was the percentage specific (e.g. positive and negative) agreement calculated?</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_8} value={4}>Specific agreement calc'ed</div>
                <div><input type="radio" bind:group={selectedData.cosmin2_8} value={3}>Agreement calc'ed</div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="mt-4"><button class="px-3 text-white bg-lightblue rounded-md" on:click={submit} title="submit">Hit it</button></div>
        {:else}
            <i>Paper</i>
        {/if}
    </div>
</div>