import React from 'react';
import styles from './FadeInSection.module.css'

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, [isVisible]);
  return (
    <div
      className={`${styles.fade_in_section} ${isVisible ? styles.is_visible : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default FadeInSection;