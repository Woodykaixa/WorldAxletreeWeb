import { Wiki } from '@/components';
import { fetchWiki } from '@/util/fetchWiki';

export default Wiki;

export const getServerSideProps = fetchWiki('NACSF', 'Unit');
