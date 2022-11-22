import { Wiki } from '@/components';
import { fetchWiki } from '@/util/fetchWiki';
import { GetStaticPaths } from 'next';

export default Wiki;

export const getServerSideProps = fetchWiki('Building');
