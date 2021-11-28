function DOMEvents() {
    const onDocumentReady = callback => {
        const state = document.readyState;

        if (state !== 'loading') {
            return callback();
        }

        document.addEventListener('DOMContentLoaded', ()=>{
            callback();
        });
    }

    return {
        onDocumentReady
    }
}

export default DOMEvents();