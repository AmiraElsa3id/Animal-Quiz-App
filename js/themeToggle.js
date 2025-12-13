//  <!-- Simple JS to handle theme toggle manually if clicked -->

        // Check for saved theme preference or system preference (optional logic simulated here)
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            if(document.getElementById('light-mode'))
                document.getElementById('dark-mode').checked = true;
        } else {
            document.documentElement.classList.remove('dark');
            if(document.getElementById('dark-mode'))
            document.getElementById('light-mode').checked = true;
        }

        // Add event listeners to sync state
        document.getElementById('light-mode')?.addEventListener('click', () => {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        });
        document.getElementById('dark-mode')?.addEventListener('click', () => {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        });
   
        if(document.getElementById('mode')){
            console.log(document.getElementById('mode'));
            
            if(document.getElementById('mode').checked){
                 document.documentElement.classList.add('dark');
            }
            else{
                document.documentElement.classList.remove('dark');
            }
            
        }
           