<script>
    export let choices = [];

    let filteredChoices = [];
    export let inputValue = '';
    let isFocused = false;
    let ul;

    export let choice;

    function filterChoices()
    {

        filteredChoices = choices.filter((element) => {
            if(element._display.toLowerCase().includes(inputValue.toLowerCase()))
            {
                return true;
            }
            else 
            {
                return false;
            }
        });
    }

    function selectChoice(c)
    {
        choice = c;
        isFocused = false;
    }

    $: { // update input value
        if(!isFocused && choice)
        {
            inputValue = choice._display;
        }
    }
</script>

<input class="w-full"
    type="text" 
    bind:value={inputValue} 
    on:input={filterChoices}
    on:blur={(e) =>{if (!ul.contains(e.explicitOriginalTarget)) isFocused = false}}
    on:focus={() =>{isFocused = true}}>

{#if filteredChoices.length > 0}
    <ul bind:this={ul} class="absolute z[-1000] m-0 p-0 t-0 border" style="{(isFocused ? '' : 'display:none;')}">
        {#each filteredChoices as p, i}
            <li class="cursor-pointer list-none top-[100%] hover:bg-lightblue hover:text-white m-0 py-2 z-50 pr-8 pl-2 bg-white" on:click={() => selectChoice(p)}>
                {@html p._display}
            </li>
        {/each}			
    </ul>
{/if}