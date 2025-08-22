document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resultDiv = document.getElementById('result');
    const convertedLinkDiv = document.getElementById('convertedLink');
    
    convertBtn.addEventListener('click', function() {
        const driveLink = document.getElementById('driveLink').value.trim();
        const linkType = document.getElementById('linkType').value;
        
        if (!driveLink) {
            alert('Google Drive link ထည့်ပေးပါ');
            return;
        }
        
        // Extract FILE_ID from Google Drive link
        const fileIdMatch = driveLink.match(/\/d\/([^\/]+)/);
        
        if (!fileIdMatch || fileIdMatch.length < 2) {
            alert('မှန်ကန်သော Google Drive link ဖြစ်ရပါမယ်');
            return;
        }
        
        const fileId = fileIdMatch[1];
        let convertedLink = '';
        
        // Convert based on selected type
        switch(linkType) {
            case 'download':
                convertedLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
                break;
            case 'preview':
                convertedLink = `https://drive.google.com/file/d/${fileId}/preview`;
                break;
            case 'view':
                convertedLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
                break;
        }
        
        // Display the converted link
        convertedLinkDiv.textContent = convertedLink;
        resultDiv.style.display = 'block';
    });
    
    copyBtn.addEventListener('click', function() {
        const convertedLink = convertedLinkDiv.textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(convertedLink)
            .then(() => {
                alert('Link ကိုကူးယူပြီးပါပြီ');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
                alert('Link ကူးယူရန် မအောင်မြင်ပါ');
            });
    });
});
