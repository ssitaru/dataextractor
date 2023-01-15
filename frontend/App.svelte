<script type="ts">
    import './main.css';
    import { SvelteToast, toast } from '@zerodevx/svelte-toast';
    
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
        exclude?: Boolean,
        paperId: Number,
        paper?: Paper,
        investigatedScore?: String,
        scoreAbbreviation?: String,
        disease?: String,
        construct?: String,
        isConstructQoL?: Boolean,
        isConstructDisActivity?: Boolean,
        isConstructOther?: Boolean,
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
        reliabilityMeasured: Boolean,
        measurementErrorMeasured: Boolean,
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
        comments?: String,
        contentValidityMeasured: Boolean,
  constructValidityMeasured: Boolean ,
  criterionValidityMeasured: Boolean,
  responsivenessMeasured: Boolean ,
  generalCosmin22: Number,
  generalCosmin23: Number,
  generalCosmin24: Number,
  generalCosmin25: Number,
  generalCosmin26: Number,
  generalCosmin27: Number,
  generalCosmin28: Number,
  generalCosmin29: Number,
  generalCosmin30: Number,
  generalCosmin31: Number,
  generalCosminB8_1 : Number,
  generalCosminB8_2 : Number,
  generalCosminB8_3 : Number,
  generalCosminB9_1 : Number,
  generalCosminB9_2 : Number,
  generalCosminB9_3 : Number,
  generalCosminB9_4 : Number,
  generalCosminB9_5 : Number,
  generalCosminB9_6 : Number,
  generalCosminB9_7 : Number,
  generalCosminB10_1 : Number,
  generalCosminB10_2 : Number,
  generalCosminB10_3 : Number,
  generalCosminB10_4 : Number,
  generalCosminB10_5 : Number,
  generalCosminB10_6 : Number,
  generalCosminB10_7 : Number,
  generalCosminB10_8 : Number,
  generalCosminB10_9 : Number,
  generalCosminB10_10 : Number,
  generalCosminB10_11 : Number,
  generalCosminB10_12 : Number,
  generalCosminB10_13 : Number
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
        toast.push('Data reload', {duration: 1500, theme: {'--toastBarHeight': 0}})
        fetch('/api/list').then((d) => d.json()).then((data) => {
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
        selectedData.reportedMetrics = selectedData.reportedMetrics.filter(elem => elem.value && elem.name);
        fetch('/api/change/'+selectedPaper.id, {method: 'POST', body: JSON.stringify(selectedData), headers: {'Content-type': 'application/json'}})
        .then((r) => {
            loadData();
        });
    }
</script>
<style>
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
<SvelteToast />
<div class="flex gap-4 p-10 prose min-w-full">
    <div class="w-[15%]">
        <h2 class="m-0">PMIDs ({papers.filter(elem => elem.structuredData).length}/{papers.length})</h2>
        <div class="flex flex-col gap-1">
            {#each papers as p}
                <div class="cursor-pointer" on:click={selectPaper(p)}>
                    {#if selectedPaper && p.id == selectedPaper.id}
                        <b>&rarr;</b>
                    {/if}
                    {#if p.structuredData && p.structuredData.exclude}
                        <span class="line-through">{p.pmid}</span>
                    {:else}
                        {p.pmid}
                    {/if}
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
            <div class="grid grid-cols-2 gap-2 w-[65%]">
                <div><a target="_blank" href="https://pubmed.ncbi.nlm.nih.gov/{selectedPaper.pmid}/">PubMed</a></div>
                <div><input type="checkbox" bind:checked={selectedData.exclude} id="excl"> <label for="excl">Exclude</label> </div>
                <div class="mb-2"><a target="_blank" href="https://sci-hub.se/{selectedPaper.doi}/">SciHub</a></div>
                <div></div>
            
                <div class="label">Investigated Score: </div>
                <div class="input"><input type="text" bind:value={selectedData.investigatedScore}></div>
                <div class="label">Score Abbv:</div>
                <div class="input"><input type="text" bind:value={selectedData.scoreAbbreviation}></div>
                <div class="label">Disease or Indication:</div>
                <div class="input"><input type="text" bind:value={selectedData.disease}></div>
                <div class="label">Construct to be measured (dis. activity/QoL):</div>
                <div class="flex gap-x-2 items-center">
                    <input type="checkbox" bind:checked={selectedData.isConstructDisActivity} id="isCDA"> <label for="isCDA">Dis. Activity</label>
                    <input type="checkbox" bind:checked={selectedData.isConstructQoL} id="isCQOL"> <label for="isCQOL">QoL</label>
                    <input type="checkbox" bind:checked={selectedData.isConstructOther} id="isCOther"> <label for="isCOther">Other</label>
                </div>
                <div class="label">Subgroup/population:</div>
                <div class="input"><input type="text" bind:value={selectedData.subgroup}></div>
                <div class="label">Sample size:</div>
                <div class="input"><input type="number" bind:value={selectedData.n}></div>
                <div><input type="checkbox" bind:checked={selectedData.isComparative} id="isC"> <label for="isC">Comparative study</label> </div>
                <div><input type="checkbox" bind:checked={selectedData.isProposal} id="isN"> <label for="isN">New proposal</label> </div>
                <div class="label">Compared with:</div>
                <div class="input"><input type="text" bind:value={selectedData.comparedWith}></div>
                <div class="label"># items:</div>
                <div class="input"><input type="number" bind:value={selectedData.numItems}></div>
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
                <div>Comments</div>
                <div><textarea bind:value={selectedData.comments} placeholder="notez"></textarea></div>
            </div>
            <h4>Study content + risk of bias</h4>
            <div class="flex gap-x-2 items-center font-bold"><input type="checkbox" bind:checked={selectedData.contentValidityMeasured} id="contValMeas"> <label for="contValMeas">study on content validity (are items okay for what they want to measure?)</label> </div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.contentValidityMeasured ? 'grid' : 'none'}">
                <!--  -->
                <div>Was an appropriate method used to ask professionals whether each item is relevant for the construct of interest?</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin22} value={4}>Widely recognized or well justified method used</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin22} value={3}>Only quantitative (survey) method(s) used or reason to assume</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin22} value={2}>Not clear or doubtful whether the method was appropriate</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin22} value={1}>Method used not appropriate</div>
                <div></div>
                <!---->
                <div>Were professionals from all relevant disciplines included?</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin23} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin23} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin23} value={2}>Doubtful/no time</div>
                <div></div>
                <div></div>
                <!---->
                <div>Was each item tested in an appropriate number of professionals? (&gt;= 7)</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin24} value={4}>Yes</div>
                <div></div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosmin24} value={1}>No</div>
                <div></div>
                <!---->
                <div>Was an appropriate approach used to analyse the data?</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin25} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin25} value={3}>Yes, but not clearly described</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin25} value={2}>Unclear</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin25} value={1}>Not appropriate</div>
                <div></div>
                <!---->
                <div>Were at least two researchers involved in the analysis?</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin26} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin26} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.generalCosmin26} value={2}>Unclear or no</div>
                <div></div>
                <div></div>
            </div>
            <div class="flex gap-x-2 items-center font-bold"><input type="checkbox" bind:checked={selectedData.constructValidityMeasured} id="constValMeas"> <label for="constValMeas">study on construct validity</label> </div>
            <div class="mt-2 mb-2" style="display: {selectedData.constructValidityMeasured ? 'block' : 'none'}">comparison with other instrument</div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.constructValidityMeasured ? 'grid' : 'none'}">
                <!--  -->
                <div> Is it clear what the comparator instrument(s) measure(s)? </div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_1} value={4}>Yes</div>
                <div></div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_1} value={1}>No</div>
                <div></div>
                <!---->
                <div>Were the measurement properties of the comparator instrument(s) sufficient?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_2} value={4}>Yes, study population similar</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_2} value={3}>Yes, but not sure if they apply to study population</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_2} value={2}>Some information</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_2} value={1}>No info or insufficient</div>
                <div></div>
                <!---->
                <div>Was the statistical method appriopriate for the hypotheses to be tested?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_3} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_3} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_3} value={2}>Not optimal</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_3} value={1}>Not appropriate</div>
                <div></div>
                <!---->
                <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_4} value={4}>No</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_4} value={2}>Minor flaws</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_4} value={1}>Other flaws</div>
                <div></div>
            </div>
            <div class="mt-2 mb-2" style="display: {selectedData.constructValidityMeasured ? 'block' : 'none'}">comparison between subgroups</div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.constructValidityMeasured ? 'grid' : 'none'}">
                <!---->
                <div>Was an adequate description provided of important characteristics of the subgroups?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_5} value={4}>Yes, adequate</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_5} value={3}>Yes, most important characteristics described</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_5} value={2}>No</div>
                <div></div>
                <div></div>
                <!---->
                <div>Was the statistical method appriopriate for the hypotheses to be tested?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_6} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_6} value={3}>Reason to assume</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_6} value={2}>Not optimal</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_6} value={1}>Not appropriate</div>
                <div></div>
                <!---->
                <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_7} value={4}>No</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_7} value={2}>Minor flaws</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB9_7} value={1}>Other flaws</div>
                <div></div>
            </div>
            
            <div class="flex gap-x-2 items-center font-bold"><input type="checkbox" bind:checked={selectedData.criterionValidityMeasured} id="critValMeas"> <label for="critValMeas">study on criterion validity</label> </div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.criterionValidityMeasured ? 'grid' : 'none'}">
                <!--  -->
                <div>For continuous scores: Were correlations, or the area under the receiver operating curve calculated?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_1} value={4}>Correlation or AUC yes</div>
                <div></div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_1} value={1}>NOT calculated</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_1} value={0}>N/A</div>
                <!---->
                <div>For dichotomous scores: Were sensitivity and specificity determined?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_2} value={4}>Sens and spec yes</div>
                <div></div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_2} value={1}>NOT calculated</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_2} value={0}>N/A</div>
                <!---->
                <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_3} value={4}>No other important flaws</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_3} value={2}>Minor flaws</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB8_3} value={1}>Major</div>
                <div></div>
            </div>
            <div class="flex gap-x-2 items-center font-bold"><input type="checkbox" bind:checked={selectedData.reliabilityMeasured} id="relMeas"> <label for="relMeas">study on reliability</label> </div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.reliabilityMeasured ? 'grid' : 'none'}" id="cosminSection1">
                <!-- Section 1 -->
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
                <div>Did the professional(s) administer the measurement without knowledge of scores or values of other repeated measurement(s) in the same patients?</div>
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
            </div>
            <div class="flex gap-x-2 items-center font-bold"><input type="checkbox" bind:checked={selectedData.measurementErrorMeasured} id="measEMeas"> <label for="measEMeas">study on measurement error</label> </div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.measurementErrorMeasured ? 'grid' : 'none'}" id="cosminSection2">
                <!-- Section 2 -->
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
            <div class="flex gap-x-2 items-center font-bold"><input type="checkbox" bind:checked={selectedData.responsivenessMeasured} id="resMeas"> <label for="resMeas">study on responsiveness</label> </div>
            <div class="mt-2 mb-2 italic" style="display: {selectedData.responsivenessMeasured ? 'block' : 'none'}">comparison to gold standard</div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.responsivenessMeasured ? 'grid' : 'none'}">
                <!--  -->
                <div>For continuous scores: Were correlations between change scores, or the area under the Receiver Operator Curve (ROC) curve calculated?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_1} value={4}>Correlation or ROC calculated</div>
                <div></div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_1} value={1}>Not calculated</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_1} value={0}>N/A</div>
                <!--  -->
                <div>For dichotomous scales: Were sensitivity and specificity (changed versus not changed) determined?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_2} value={4}>Sens/spec calculated</div>
                <div></div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_2} value={1}>Not calculated</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_2} value={0}>N/A</div>
                <!---->
                <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_3} value={4}>No</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_3} value={2}>Minor flaws</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_3} value={1}>Other flaws</div>
                <div></div>
            </div>
            <div class="mt-2 mb-2 italic" style="display: {selectedData.responsivenessMeasured ? 'block' : 'none'}">comparison to other instrument</div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.responsivenessMeasured ? 'grid' : 'none'}">
                <!--  -->
                <div>Is it clear what the comparator instrument(s) measure(s)?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_4} value={4}>Yes</div>
                <div></div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_4} value={1}>No</div>
                <div></div>
                <!---->
                <div>Were the measurement properties of the comparator instrument(s) sufficient?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_5} value={4}>Yes, study population similar</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_5} value={3}>Yes, but not sure if they apply to study population</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_5} value={2}>Some information</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_5} value={1}>No info or insufficient</div>
                <div></div>
                 <!---->
                 <div>Was the statistical method appriopriate for the hypotheses to be tested?</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_6} value={4}>Yes</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_6} value={3}>Reason to assume</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_6} value={2}>Not optimal</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_6} value={1}>Not appropriate</div>
                 <div></div>
                 <!---->
                 <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_7} value={4}>No</div>
                 <div></div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_7} value={2}>Minor flaws</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_7} value={1}>Other flaws</div>
                 <div></div>
            </div>
            <div class="mt-2 mb-2 italic" style="display: {selectedData.responsivenessMeasured ? 'block' : 'none'}">comparison between subgroups</div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.responsivenessMeasured ? 'grid' : 'none'}">
                <!--  -->
                <div>Was an adequate description provided of important characteristics of the subgroups?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_8} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_8} value={3}>Most important characteristics</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_8} value={1}>No</div>
                <div></div>
                <!---->
                 <div>Was the statistical method appriopriate for the hypotheses to be tested?</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_9} value={4}>Yes</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_9} value={3}>Reason to assume</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_9} value={2}>Not optimal</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_9} value={1}>Not appropriate</div>
                 <div></div>
                 <!---->
                 <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_10} value={4}>No</div>
                 <div></div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_10} value={2}>Minor flaws</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_10} value={1}>Other flaws</div>
                 <div></div>
            </div>
            <div class="mt-2 mb-2 italic" style="display: {selectedData.responsivenessMeasured ? 'block' : 'none'}">comparison before and after intervention</div>
            <div class="grid gap-2 w-[75%]" style="grid-template-columns: 40% auto auto auto auto auto; display: {selectedData.responsivenessMeasured ? 'grid' : 'none'}">
                <!--  -->
                <div>Was an adequate description provided of the intervention?</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_11} value={4}>Yes</div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_11} value={3}>Most important characteristics</div>
                <div></div>
                <div><input type="radio" bind:group={selectedData.generalCosminB10_11} value={1}>No</div>
                <div></div>
                <!---->
                 <div>Was the statistical method appriopriate for the hypotheses to be tested?</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_12} value={4}>Yes</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_12} value={3}>Reason to assume</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_12} value={2}>Not optimal</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_12} value={1}>Not appropriate</div>
                 <div></div>
                 <!---->
                 <div>Were there any other important flaws in the design or statistical methods of the study?</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_13} value={4}>No</div>
                 <div></div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_13} value={2}>Minor flaws</div>
                 <div><input type="radio" bind:group={selectedData.generalCosminB10_13} value={1}>Other flaws</div>
                 <div></div>
            </div>
            <div class="mt-4"><button class="px-3 text-white bg-lightblue rounded-md" on:click={submit} title="submit">Hit it</button></div>
        {:else}
            <i>Paper</i>
        {/if}
    </div>
</div>