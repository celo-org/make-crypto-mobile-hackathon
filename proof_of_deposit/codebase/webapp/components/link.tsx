import { Link as InternalLink } from 'react-router-dom';


export function Link({ url, children }: { url: string; children: any }) {
    const className = 'text-blue-500 underline';
    if (url.startsWith('https://') || url.startsWith('http://')) {
      return (
        <a href={url} target="_blank" className={className}>
          {children}
        </a>
      );
    }
  
    return (
      <InternalLink to={url}>
        <a className={className}>{children}</a>
      </InternalLink>
    );
  }