import Page from './Page';
import PageHeader from './Header';
import PageFooter from './Footer';
import { Header } from '../header';

// slot 插槽
Page.Header = Header;
Page.Footer = PageFooter;

export { Page }
