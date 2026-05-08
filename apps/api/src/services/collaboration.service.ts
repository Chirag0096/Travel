type JoinResult = {
  tripId: string;
  joined: boolean;
  role: 'viewer' | 'editor';
};

export class CollaborationService {
  async joinTrip(tripId: string, canEdit: boolean): Promise<JoinResult> {
    return {
      tripId,
      joined: true,
      role: canEdit ? 'editor' : 'viewer',
    };
  }
}
