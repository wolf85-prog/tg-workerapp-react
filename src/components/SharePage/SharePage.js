import React, {useEffect, useState} from 'react';
import btnChange from "../../image/buttons/button_for_menu2.png"

const SharePage = ({title, text, url }) => {
    const [isShowed, setIsShowed] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
  
    const onShareClick = (e) => {
      e.preventDefault()
      if (navigator.share) {
        navigator.share({
          title: title,
          text: text,
          url: url,
        })
        .catch(console.error)
      } else {
        setIsShowed(currentIsShowed => !currentIsShowed)
      }
    }
  
    const onFacebookShare = (e) => {
      e.preventDefault()
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        'facebook-share-dialog',
        'width=800,height=600'
      )
    }
  
    const onCopyToClipboard = (e) => {
      e.preventDefault()
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(url)
          .then(() => setIsCopied(true))
          .catch(console.error)
      }
    }
  
    useEffect(() => {
      if (!isCopied) return
  
      const timer = setTimeout(() => {
        setIsCopied(currentIsCopied => !currentIsCopied)
      }, 3000)
  
      return () => clearTimeout(timer)
    }, [isCopied])

    return (
        <div>
            <button onClick={onShareClick} className="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Отправить</button>
            {isShowed ? (
                <ul>
                <li>
                    <button onClick={onFacebookShare}>Share on facebook</button>
                </li>
                <li>
                    <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
                    >
                    Share on twitter
                    </a>
                </li>
                <li>
                    <button onClick={onCopyToClipboard}>
                    {isCopied ? 'Copied' : 'Copy to clipboard'}
                    </button>
                </li>
                </ul>
            ) : null}
        </div>
    );
};

export default SharePage;