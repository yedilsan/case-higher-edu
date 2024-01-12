import { TQueryOrderObject } from '@cubejs-client/core';
import { useCubeQuery } from '@cubejs-client/react';
import cubejsApi from '../service/cubejsConfig';

interface UseCubeDataProps {
	measures?: string;
	dimension?: string[];
	orderBy?: string[];
}

export const useCubeData = ({
	measures,
	dimension,
	orderBy,
}: UseCubeDataProps) => {
	const { resultSet, isLoading, error } = useCubeQuery(
		{
			measures: measures ? [measures] : undefined,
			dimensions: dimension,
			order: orderBy
				? ({ [`${orderBy[0]}`]: orderBy[1] } as TQueryOrderObject)
				: undefined,
		},
		{ cubejsApi }
	);

	return { resultSet, isLoading, error };
};
