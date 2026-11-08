const url='https://raj-microsoft.github.io/tide-almanac/';
for(let i=0;i<15;i++){const r=await fetch(url);console.log(new Date().toISOString(),r.status);if(r.status===200)process.exit(0);await new Promise(r=>setTimeout(r,15000));}process.exit(1);
