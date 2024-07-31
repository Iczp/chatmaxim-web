/**
 *
 *
 * @param {{
 *   chatObjectId: number;
 *   sessionUnitId?: string;
 *   title?: string;
 * }} {
 *   chatObjectId,
 *   sessionUnitId,
 *   title,
 * }
 */

export const navToChat = ({
  chatObjectId,
  sessionUnitId,
  title,
}: {
  chatObjectId: number;
  sessionUnitId?: string;
  title?: string;
}) => {
  let path = `/chat/${chatObjectId}`;
  if (sessionUnitId) {
    path += `/${sessionUnitId}`;
  }
  navigateTo({
    path,
    query: {
      title,
    },
  });
};
